import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { GameScreen, Niveau, Player } from './types';
import { sound } from './data/sound-engine';
import Header from './components/ui/Header';
import RulesModal from './components/ui/RulesModal';
import MainMenu from './components/screens/MainMenu';
import SetupScreen from './components/screens/SetupScreen';
import BoardScreen from './components/screens/BoardScreen';
import ResultScreen from './components/screens/ResultScreen';
import WorldMapScreen from './components/screens/WorldMapScreen';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('main-menu');
  const [muted, setMuted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [selectedNiveau, setSelectedNiveau] = useState<Niveau>('debutant');
  const [players, setPlayers] = useState<Player[]>([]);
  const [niveau, setNiveau] = useState<Niveau>('debutant');
  const [prevScreen, setPrevScreen] = useState<GameScreen>('main-menu');

  useEffect(() => { sound.muted = muted; }, [muted]);

  const goTo = (s: GameScreen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const handleGameStart = (p: Player[], n: Niveau) => {
    setPlayers(p);
    setNiveau(n);
    goTo('board');
  };

  const handleGameOver = (finalPlayers: Player[]) => {
    setPlayers(finalPlayers);
    goTo('result');
  };

  const handleRestart = () => {
    setPlayers([]);
    setScreen('main-menu');
  };

  return (
    <>
      <Header
        screen={screen}
        muted={muted}
        onToggleMute={() => setMuted(m => !m)}
        onShowRules={() => setShowRules(true)}
        onGoToMap={() => goTo('world-map')}
        onRestart={handleRestart}
      />

      <RulesModal show={showRules} onClose={() => setShowRules(false)} />

      <AnimatePresence mode="wait">
        {screen === 'main-menu' && (
          <MainMenu
            key="main-menu"
            selectedNiveau={selectedNiveau}
            onSelectNiveau={setSelectedNiveau}
            onPlay={() => goTo('setup')}
            onViewMap={() => goTo('world-map')}
            onShowRules={() => setShowRules(true)}
          />
        )}

        {screen === 'setup' && (
          <SetupScreen
            key="setup"
            defaultNiveau={selectedNiveau}
            onStart={handleGameStart}
            onBack={() => goTo('main-menu')}
          />
        )}

        {screen === 'board' && players.length > 0 && (
          <BoardScreen
            key="board"
            players={players}
            niveau={niveau}
            onGameOver={handleGameOver}
          />
        )}

        {screen === 'world-map' && (
          <WorldMapScreen
            key="world-map"
            players={players}
            onBack={() => goTo(prevScreen === 'world-map' ? 'main-menu' : prevScreen)}
          />
        )}

        {screen === 'result' && (
          <ResultScreen
            key="result"
            players={players}
            onRestart={handleRestart}
            onViewMap={() => goTo('world-map')}
          />
        )}
      </AnimatePresence>
    </>
  );
}
