import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Player, Niveau } from '../../types';

interface SetupScreenProps {
  defaultNiveau: Niveau;
  onStart: (players: Player[], niveau: Niveau) => void;
  onBack: () => void;
}

const COLOR_THEMES = [
  { color: '#6366f1', bg: 'bg-indigo-50', border: 'border-indigo-400 text-indigo-700' },
  { color: '#ec4899', bg: 'bg-pink-50',   border: 'border-pink-400 text-pink-700' },
  { color: '#f59e0b', bg: 'bg-amber-50',  border: 'border-amber-400 text-amber-700' },
  { color: '#10b981', bg: 'bg-emerald-50',border: 'border-emerald-400 text-emerald-700' },
];

const AVATARS = ['🦊','🐼','🐨','🐯','🦄','🦅','🐙','🦋'];
const NIVEAU_OPTIONS: Niveau[] = ['debutant', 'intermediaire', 'avance'];
const NIVEAU_LABELS: Record<Niveau, string> = {
  debutant: '🟢 Débutant',
  intermediaire: '🟡 Intermédiaire',
  avance: '🔴 Avancé',
};

export default function SetupScreen({ defaultNiveau, onStart, onBack }: SetupScreenProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState(['', 'Cécile (Bot)', 'Marc (Bot)', 'Inès (Bot)']);
  const [avatars, setAvatars] = useState(['🦊', '🐼', '🐨', '🐯']);
  const [bots, setBots] = useState([false, true, true, true]);
  const [niveau, setNiveau] = useState<Niveau>(defaultNiveau);

  const handleStart = () => {
    const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
      id: i + 1,
      name: names[i] || `Joueur ${i + 1}`,
      color: COLOR_THEMES[i].color,
      bgClass: COLOR_THEMES[i].bg,
      borderClass: COLOR_THEMES[i].border,
      avatar: avatars[i],
      culturalPoints: 0,
      position: 0,
      isJailed: false,
      jailTurns: 0,
      passportStamps: [],
      streakCount: 0,
      niveau,
      isBot: bots[i],
      isSkippingTurn: false,
    }));
    onStart(players, niveau);
  };

  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center px-4 pt-16 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white p-6 space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-2">⚙️</div>
            <h2 className="text-2xl font-black font-display text-slate-800">Configuration</h2>
            <p className="text-sm text-slate-500 mt-1">Configurez votre équipe de voyageurs francophones</p>
          </div>

          {/* Niveau */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              Niveau de difficulté
            </label>
            <div className="flex gap-2">
              {NIVEAU_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => setNiveau(n)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                    niveau === n
                      ? 'border-indigo-500 bg-indigo-600 text-white shadow-md'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {NIVEAU_LABELS[n]}
                </button>
              ))}
            </div>
          </div>

          {/* Number of players */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              Nombre de joueurs
            </label>
            <div className="flex gap-2">
              {[2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setPlayerCount(n)}
                  className={`flex-1 py-3 rounded-xl font-black text-lg border-2 transition-all ${
                    playerCount === n
                      ? 'border-indigo-500 bg-indigo-600 text-white shadow-md'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Players */}
          <div className="space-y-3">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400">Joueurs</label>
            {Array.from({ length: playerCount }, (_, i) => (
              <div key={i} className="flex gap-2 items-center bg-slate-50 rounded-2xl p-3 border border-slate-100">
                {/* Color dot */}
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLOR_THEMES[i].color }} />
                
                {/* Avatar */}
                <select
                  value={avatars[i]}
                  onChange={e => setAvatars(prev => prev.map((a, ai) => ai === i ? e.target.value : a))}
                  className="bg-transparent text-lg border-none focus:ring-0 cursor-pointer"
                >
                  {AVATARS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>

                {/* Name */}
                <input
                  type="text"
                  placeholder={`Joueur ${i + 1}`}
                  value={names[i]}
                  onChange={e => setNames(prev => prev.map((n, ni) => ni === i ? e.target.value : n))}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />

                {/* Bot toggle */}
                {i > 0 && (
                  <button
                    onClick={() => setBots(prev => prev.map((b, bi) => bi === i ? !b : b))}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all shrink-0 ${
                      bots[i] ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {bots[i] ? '🤖' : '👤'}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Start */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            COMMENCER L'AVENTURE !
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
