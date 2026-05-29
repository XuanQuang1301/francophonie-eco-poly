import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, BookOpen } from 'lucide-react';
import { Player, BoardSpace, QuizQuestion, CarteChance, CarteCulture, TransactionLog, Niveau, PassportStamp } from '../../types';
import { BOARD_SPACES } from '../../data/board-spaces';
import { QUIZ_QUESTIONS } from '../../data/quiz-questions';
import { CARTES_CHANCE, CARTES_CULTURE } from '../../data/fate-cards';
import { sound } from '../../data/sound-engine';
import GameBoard from '../board/GameBoard';
import PlayerHUD from '../ui/PlayerHUD';
import ActivityLog from '../ui/ActivityLog';
import QuizModal from '../quiz/QuizModal';
import { CarteChanceModal, CarteCultureModal } from '../ui/FateCardModal';
import PassportView from '../passport/PassportView';
import EscapeQuiz from '../minigames/EscapeQuiz';
import MatchFlag from '../minigames/MatchFlag';
import ClickerGame from '../minigames/ClickerGame';

interface BoardScreenProps {
  players: Player[];
  niveau: Niveau;
  onGameOver: (players: Player[]) => void;
}

type Modal =
  | { type: 'quiz'; question: QuizQuestion }
  | { type: 'chance'; carte: CarteChance }
  | { type: 'culture'; carte: CarteCulture }
  | { type: 'festival'; game: 'escape' | 'match' | 'clicker' }
  | { type: 'alliance' }
  | { type: 'aeroport' }
  | { type: 'finale'; question: QuizQuestion }
  | null;

const BOARD_SIZE = 32;
const MAX_ROUNDS = 25; // End game after this many total turns

// ── Helpers ───────────────────────────────────────────────────
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getQuizForSpace(space: BoardSpace, niveau: Niveau): QuizQuestion | null {
  if (space.type === 'ville') {
    const pool = QUIZ_QUESTIONS.filter(q => q.type === 'ville' && q.country === space.country);
    return pool.length > 0 ? pickRandom(pool) : null;
  }
  if (space.type === 'langue') {
    const pool = QUIZ_QUESTIONS.filter(q => q.type === 'langue' && q.difficulty === niveau);
    return pool.length > 0 ? pickRandom(pool) : null;
  }
  if (space.type === 'finale') {
    const pool = QUIZ_QUESTIONS.filter(q => q.difficulty === 'avance');
    return pool.length > 0 ? pickRandom(pool) : null;
  }
  return null;
}

export default function BoardScreen({ players: initialPlayers, niveau, onGameOver }: BoardScreenProps) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'moving' | 'resolving'>('playing');
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [logs, setLogs] = useState<TransactionLog[]>([{
    id: 'init', timestamp: '00:00', playerName: 'Système', playerAvatar: '🌍',
    message: 'Bienvenue ! Lancez les dés pour commencer votre voyage francophone.',
    type: 'info'
  }]);
  const [totalTurns, setTotalTurns] = useState(0);
  const [showPassport, setShowPassport] = useState<number | null>(null); // player id
  const [tileInfo, setTileInfo] = useState<BoardSpace | null>(null);

  const moveInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const addLog = (player: Player, message: string, type: TransactionLog['type']) => {
    setLogs(prev => [{
      id: Math.random().toString(36),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      playerName: player.name,
      playerAvatar: player.avatar,
      message,
      type,
    }, ...prev]);
  };

  const updatePlayer = (id: number, update: Partial<Player>) => {
    setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...update } : p));
  };

  // ── Bot auto-play ──────────────────────────────────────────
  useEffect(() => {
    const player = players[currentIdx];
    if (gameState === 'playing' && player.isBot) {
      const t = setTimeout(() => rollDice(), 1200);
      return () => clearTimeout(t);
    }
  }, [gameState, currentIdx]);

  // ── Roll dice ──────────────────────────────────────────────
  const rollDice = () => {
    if (isRolling || gameState !== 'playing') return;
    const player = players[currentIdx];

    if (player.isSkippingTurn) {
      addLog(player, 'passe son tour (bloqué en douane).', 'info');
      updatePlayer(player.id, { isSkippingTurn: false });
      nextTurn();
      return;
    }

    if (player.isJailed) {
      const turns = player.jailTurns + 1;
      if (turns >= 3) {
        updatePlayer(player.id, { isJailed: false, jailTurns: 0 });
        addLog(player, 'est libéré de prison après 3 tours !', 'jail');
      } else {
        updatePlayer(player.id, { jailTurns: turns });
        addLog(player, `reste en prison (${turns}/3 tours).`, 'jail');
        nextTurn();
        return;
      }
    }

    setIsRolling(true);
    sound.playDice();
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    // Animate dice
    let rolls = 8;
    const rollAnim = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
      rolls--;
      if (rolls <= 0) {
        clearInterval(rollAnim);
        setDice([d1, d2]);
        setIsRolling(false);
        addLog(player, `lance [${d1}+${d2}] et avance de ${d1 + d2} cases !`, 'info');
        movePlayer(d1 + d2);
      }
    }, 60);
  };

  // ── Move player step by step ────────────────────────────────
  const movePlayer = (steps: number) => {
    setGameState('moving');
    const player = players[currentIdx];
    let pos = player.position;
    let step = 0;

    if (moveInterval.current) clearInterval(moveInterval.current);

    moveInterval.current = setInterval(() => {
      step++;
      pos = (pos + 1) % BOARD_SIZE;

      setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: pos } : p));
      sound.playTick();

      // Passed DÉPART
      if (pos === 0 && step < steps) {
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, culturalPoints: p.culturalPoints + 50 } : p));
        addLog(player, 'passe par DÉPART et gagne +50 💎 !', 'depart');
      }

      if (step >= steps) {
        clearInterval(moveInterval.current!);
        resolveSpace(pos);
      }
    }, 220);
  };

  // ── Resolve landed space ────────────────────────────────────
  const resolveSpace = (pos: number) => {
    setGameState('resolving');
    const space = BOARD_SPACES.find(s => s.id === pos)!;
    const player = players[currentIdx];

    addLog(player, `s'arrête sur ${space.name}.`, 'info');

    switch (space.type) {
      case 'start':
        updatePlayer(player.id, { culturalPoints: player.culturalPoints + 50 });
        addLog(player, 'atterrit sur DÉPART ! +50 💎 bonus !', 'depart');
        nextTurn();
        break;

      case 'free-parking':
      case 'jail':
        nextTurn();
        break;

      case 'go-to-jail':
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: 24, isJailed: true, jailTurns: 0 } : p));
        addLog(player, '🔒 Va directement en prison !', 'jail');
        sound.playJail();
        nextTurn();
        break;

      case 'ville':
      case 'langue': {
        const question = getQuizForSpace(space, niveau);
        if (question) {
          setModal({ type: 'quiz', question });
        } else {
          nextTurn();
        }
        break;
      }

      case 'finale': {
        const question = getQuizForSpace(space, niveau);
        if (question) setModal({ type: 'finale', question: { ...question, difficulty: 'avance', pointsValue: 300 } });
        else nextTurn();
        break;
      }

      case 'carte-chance':
        setModal({ type: 'chance', carte: pickRandom(CARTES_CHANCE) });
        break;

      case 'carte-culture':
        setModal({ type: 'culture', carte: pickRandom(CARTES_CULTURE) });
        break;

      case 'festival': {
        const games: Array<'escape' | 'match' | 'clicker'> = ['escape', 'match', 'clicker'];
        setModal({ type: 'festival', game: pickRandom(games) });
        break;
      }

      case 'alliance':
        setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, culturalPoints: p.culturalPoints + 75 } : p));
        addLog(player, 'visite l\'Alliance Française ! +75 💎', 'info');
        setTimeout(() => nextTurn(), 1500);
        break;

      case 'aeroport':
        setModal({ type: 'aeroport' });
        break;

      default:
        nextTurn();
    }
  };

  // ── Quiz answered ───────────────────────────────────────────
  const handleQuizResult = (correct: boolean, points: number, isVille: boolean, space?: BoardSpace) => {
    const player = players[currentIdx];
    setModal(null);

    if (correct) {
      const streak = player.streakCount + 1;
      const bonusStreak = streak >= 3 ? 50 : 0;
      const total = points + bonusStreak;
      sound.playSuccess();

      // Award stamp if Ville question
      let newStamps = [...player.passportStamps];
      if (isVille && space?.country && space?.countryFlag) {
        const alreadyHas = newStamps.some(s => s.country === space.country);
        if (!alreadyHas) {
          const stamp: PassportStamp = {
            country: space.country,
            countryFlag: space.countryFlag,
            region: space.region!,
            earnedAt: new Date().toISOString(),
          };
          newStamps = [...newStamps, stamp];
          sound.playStamp();
          addLog(player, `🎉 Nouveau tampon Passeport : ${space.countryFlag} ${space.country} !`, 'stamp');
        }
      }

      updatePlayer(player.id, {
        culturalPoints: player.culturalPoints + total,
        streakCount: streak,
        passportStamps: newStamps,
      });

      addLog(player,
        `✅ Bonne réponse ! +${total} 💎${bonusStreak > 0 ? ` (dont +${bonusStreak} série)` : ''}`,
        'quiz'
      );
    } else {
      sound.playFailure();
      updatePlayer(player.id, { streakCount: 0 });
      addLog(player, '❌ Mauvaise réponse… Pas de points cette fois.', 'quiz');
    }

    // Check win condition
    checkWin();
    setTimeout(() => nextTurn(), 200);
  };

  // ── Carte Chance resolved ───────────────────────────────────
  const handleChance = (carte: CarteChance) => {
    const player = players[currentIdx];
    setModal(null);
    const newPts = Math.max(0, player.culturalPoints + carte.pointsChange);
    const skip = carte.effect === 'skip-turn';
    const extra = carte.effect === 'extra-turn';
    updatePlayer(player.id, { culturalPoints: newPts, isSkippingTurn: skip });
    addLog(player, `🎲 ${carte.title} → ${carte.pointsChange > 0 ? '+' : ''}${carte.pointsChange} 💎${skip ? ' ⚠️ Tour perdu !' : extra ? ' 🎉 Tour bonus !' : ''}`, 'carte');
    if (carte.pointsChange > 0) sound.playSuccess(); else sound.playFailure();
    setTimeout(() => {
      if (extra) { setGameState('playing'); } // Play again
      else nextTurn();
    }, 300);
  };

  // ── Carte Culture answered ─────────────────────────────────
  const handleCultureResult = (earned: number) => {
    const player = players[currentIdx];
    setModal(null);
    if (earned > 0) {
      sound.playSuccess();
      updatePlayer(player.id, { culturalPoints: player.culturalPoints + earned });
      addLog(player, `🎴 Carte Culture ! +${earned} 💎`, 'carte');
    } else {
      addLog(player, `🎴 Carte Culture — pas de points cette fois.`, 'carte');
    }
    setTimeout(() => nextTurn(), 300);
  };

  // ── Festival / mini-game finished ──────────────────────────
  const handleMiniGame = (success: boolean) => {
    const player = players[currentIdx];
    setModal(null);
    const reward = 200;
    if (success) {
      sound.playSuccess();
      updatePlayer(player.id, { culturalPoints: player.culturalPoints + reward });
      addLog(player, `🎪 Mini-jeu réussi ! +${reward} 💎`, 'minigame');
    } else {
      sound.playFailure();
      addLog(player, `🎪 Mini-jeu échoué. Continue à apprendre !`, 'minigame');
    }
    setTimeout(() => nextTurn(), 300);
  };

  // ── Aéroport: teleport to alliance française ───────────────
  const handleAeroport = () => {
    const player = players[currentIdx];
    setModal(null);
    // Find an alliance tile (id 14)
    const allianceId = 14;
    setPlayers(prev => prev.map((p, i) => i === currentIdx ? { ...p, position: allianceId } : p));
    addLog(player, '✈️ Téléporté à l\'Alliance Française !', 'info');
    // Grant alliance bonus
    updatePlayer(player.id, { culturalPoints: player.culturalPoints + 75 });
    setTimeout(() => nextTurn(), 1500);
  };

  // ── Check win ──────────────────────────────────────────────
  const checkWin = () => {
    const turns = totalTurns + 1;
    setTotalTurns(turns);

    // Win: first player with 6+ unique countries
    const hasPassport = players.find(p => {
      const unique = new Set(p.passportStamps.map(s => s.country)).size;
      return unique >= 6;
    });
    if (hasPassport || turns >= MAX_ROUNDS) {
      setTimeout(() => onGameOver(players), 500);
    }
  };

  // ── Next turn ──────────────────────────────────────────────
  const nextTurn = () => {
    setTotalTurns(p => {
      const next = p + 1;
      if (next >= MAX_ROUNDS) {
        setTimeout(() => onGameOver(players), 600);
      }
      return next;
    });
    setCurrentIdx(prev => (prev + 1) % players.length);
    setGameState('playing');
  };

  const currentPlayer = players[currentIdx];
  const isMoving = gameState !== 'playing';
  const passportPlayer = showPassport !== null ? players.find(p => p.id === showPassport) : null;

  // Dice faces
  const DICE_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];

  return (
    <div className="min-h-screen animated-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-3 md:px-5 flex flex-col lg:flex-row gap-4 items-start">

        {/* ── Board column ─────────────────────── */}
        <div className="w-full lg:w-8/12 xl:w-7/12">
          <GameBoard
            players={players}
            currentPlayerIndex={currentIdx}
            onTileClick={(space) => setTileInfo(space)}
          >
            {/* Center content */}
            <div className="flex flex-col items-center justify-between h-full w-full relative">
              {/* Title */}
              <div className="text-center">
                <h1 className="text-xl md:text-3xl font-black font-display bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent leading-none">
                  Francophonie Board
                </h1>
                <div className="h-0.5 w-16 bg-indigo-300 mx-auto mt-1 rounded-full" />
              </div>

              {/* Current player */}
              <div className={`px-4 py-2 rounded-2xl text-center ${currentPlayer.bgClass} border-2`}
                style={{ borderColor: currentPlayer.color }}>
                <div className="text-lg">{currentPlayer.avatar}</div>
                <div className="text-xs font-black text-slate-800">{currentPlayer.name}</div>
                <div className="text-sm font-black text-indigo-600">{currentPlayer.culturalPoints} 💎</div>
              </div>

              {/* Dice */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  {[dice[0], dice[1]].map((d, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-2xl md:text-3xl border-2 border-slate-200 ${isRolling ? 'animate-dice-roll' : ''}`}
                    >
                      {DICE_FACES[d - 1]}
                    </div>
                  ))}
                </div>

                <button
                  onClick={rollDice}
                  disabled={isMoving || !!modal}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <Dices className="w-4 h-4" />
                  {isMoving ? 'En route…' : 'Lancer les dés'}
                </button>
              </div>

              {/* Turn info */}
              <div className="text-[10px] text-slate-400 text-center">
                Tour {totalTurns + 1} / {MAX_ROUNDS}
              </div>

              {/* MODALS inside board center */}
              <AnimatePresence>
                {modal?.type === 'quiz' && (
                  <QuizModal
                    question={modal.question}
                    player={currentPlayer}
                    onClose={(correct, pts) => {
                      const space = BOARD_SPACES.find(s => s.id === currentPlayer.position);
                      handleQuizResult(correct, pts, modal.question.type === 'ville', space);
                    }}
                  />
                )}
                {modal?.type === 'finale' && (
                  <QuizModal
                    question={modal.question}
                    player={currentPlayer}
                    onClose={(correct, pts) => handleQuizResult(correct, pts, false)}
                  />
                )}
                {modal?.type === 'chance' && (
                  <CarteChanceModal
                    carte={modal.carte}
                    onClose={() => handleChance(modal.carte)}
                  />
                )}
                {modal?.type === 'culture' && (
                  <CarteCultureModal
                    carte={modal.carte}
                    onClose={handleCultureResult}
                  />
                )}
                {modal?.type === 'festival' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 flex items-center justify-center bg-purple-900/40 backdrop-blur-sm p-4"
                  >
                    <div className="bg-white rounded-3xl shadow-2xl p-5 w-full max-w-sm border-2 border-purple-200">
                      <div className="text-center mb-4">
                        <div className="text-3xl mb-1">🎪</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-purple-500">FESTIVAL FRANCOPHONE</div>
                        <h3 className="text-lg font-black text-slate-900 mt-1">
                          {modal.game === 'escape' ? '⏱️ Escape Quiz' : modal.game === 'match' ? '🚩 Match de Drapeaux' : '🖱️ Jeu de Tapotement'}
                        </h3>
                      </div>
                      {modal.game === 'escape' && (
                        <EscapeQuiz reward={200} isBot={currentPlayer.isBot} onComplete={handleMiniGame} />
                      )}
                      {modal.game === 'match' && (
                        <MatchFlag reward={200} isBot={currentPlayer.isBot} onComplete={handleMiniGame} />
                      )}
                      {modal.game === 'clicker' && (
                        <ClickerGame reward={200} isBot={currentPlayer.isBot} onComplete={handleMiniGame} />
                      )}
                    </div>
                  </motion.div>
                )}
                {modal?.type === 'aeroport' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 flex items-center justify-center bg-cyan-900/40 backdrop-blur-sm p-4"
                  >
                    <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-xs border-2 border-cyan-200 text-center">
                      <div className="text-5xl mb-3">✈️</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500 mb-1">AÉROPORT</div>
                      <h3 className="text-lg font-black text-slate-900 mb-3">Vol direct vers l'Alliance Française !</h3>
                      <p className="text-sm text-slate-600 mb-4">Vous vous téléportez vers l'Alliance Française et gagnez +75 💎 !</p>
                      <button onClick={handleAeroport}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl transition-colors">
                        Embarquer ! ✈️
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GameBoard>

          {/* Tile info panel */}
          <AnimatePresence>
            {tileInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="mt-3 bg-white/90 rounded-2xl p-3 border border-slate-200 flex items-start gap-3 shadow-sm"
              >
                <span className="text-2xl">{tileInfo.countryFlag ?? '📍'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800">{tileInfo.name}</p>
                  {tileInfo.region && <p className="text-xs text-slate-400">{tileInfo.region}</p>}
                  {tileInfo.description && <p className="text-xs text-slate-600 mt-1">{tileInfo.description}</p>}
                </div>
                <button onClick={() => setTileInfo(null)} className="text-slate-300 hover:text-slate-500 shrink-0">✕</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sidebar ──────────────────────────── */}
        <div className="w-full lg:w-4/12 xl:w-5/12 flex flex-col gap-4 lg:sticky lg:top-20">

          {/* Players HUD */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-white p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Joueurs</span>
              {players.map(p => (
                <button key={p.id} onClick={() => setShowPassport(p.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5 transition-colors"
                  title="Voir le Passeport"
                >
                  <span>{p.avatar}</span>
                  <BookOpen className="w-3 h-3" />
                </button>
              ))}
            </div>
            <PlayerHUD players={players} currentPlayerIndex={currentIdx} />
          </div>

          {/* Activity log */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-white p-4">
            <ActivityLog logs={logs} />
          </div>
        </div>
      </div>

      {/* Passport modal */}
      <AnimatePresence>
        {passportPlayer && (
          <PassportView player={passportPlayer} onClose={() => setShowPassport(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
