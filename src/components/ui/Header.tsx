import { Globe, Volume2, VolumeX, HelpCircle, Map, RotateCcw } from 'lucide-react';
import { GameScreen } from '../../types';

interface HeaderProps {
  screen: GameScreen;
  muted: boolean;
  onToggleMute: () => void;
  onShowRules: () => void;
  onGoToMap: () => void;
  onRestart: () => void;
}

export default function Header({ screen, muted, onToggleMute, onShowRules, onGoToMap, onRestart }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-indigo-100 flex justify-between items-center px-4 md:px-6 py-2.5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌍</span>
        <div className="hidden sm:block">
          <span className="text-lg font-black font-display bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Francophonie
          </span>
          <span className="text-lg font-black font-display text-slate-700"> Board</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-full hover:bg-indigo-50 text-slate-500 hover:text-indigo-700 transition-colors"
          title={muted ? 'Activer le son' : 'Désactiver le son'}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onShowRules}
          className="p-2 rounded-full hover:bg-indigo-50 text-slate-500 hover:text-indigo-700 transition-colors flex items-center gap-1"
          title="Règles du jeu"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="hidden md:inline text-xs font-semibold">Règles</span>
        </button>

        {screen === 'board' && (
          <button
            onClick={onGoToMap}
            className="p-2 rounded-full hover:bg-purple-50 text-slate-500 hover:text-purple-700 transition-colors flex items-center gap-1"
            title="Carte Francophonie"
          >
            <Map className="w-4 h-4" />
            <span className="hidden md:inline text-xs font-semibold">Carte</span>
          </button>
        )}

        {(screen === 'board' || screen === 'result') && (
          <button
            onClick={onRestart}
            className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Recommencer</span>
          </button>
        )}
      </div>
    </header>
  );
}
