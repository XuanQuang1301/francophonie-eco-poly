import { motion } from 'motion/react';
import { Sparkles, Map, BookOpen } from 'lucide-react';
import { Niveau } from '../../types';

interface MainMenuProps {
  onPlay: () => void;
  onViewMap: () => void;
  onShowRules: () => void;
  selectedNiveau: Niveau;
  onSelectNiveau: (n: Niveau) => void;
}

const NIVEAUX: { id: Niveau; label: string; emoji: string; desc: string; color: string }[] = [
  { id: 'debutant',      label: 'Débutant',      emoji: '🟢', desc: 'Couleurs, chiffres, salutations', color: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
  { id: 'intermediaire', label: 'Intermédiaire', emoji: '🟡', desc: 'Conjugaison, géographie, culture', color: 'border-amber-400 bg-amber-50 text-amber-800' },
  { id: 'avance',        label: 'Avancé',        emoji: '🔴', desc: 'Idiomes, subjonctif, littérature', color: 'border-rose-400 bg-rose-50 text-rose-800' },
];

const COUNTRIES = ['🇫🇷','🇧🇪','🇨🇭','🇸🇳','🇲🇦','🇨🇮','🇨🇦','🇭🇹','🇻🇳','🇱🇧'];

export default function MainMenu({ onPlay, onViewMap, onShowRules, selectedNiveau, onSelectNiveau }: MainMenuProps) {
  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center px-4 pt-16 pb-10">
      
      {/* Floating country flags */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {COUNTRIES.map((flag, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl md:text-5xl opacity-10"
            style={{
              left: `${(i * 11) % 95}%`,
              top: `${(i * 17 + 5) % 90}%`,
            }}
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          >
            {flag}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-6xl md:text-8xl mb-4"
          >
            🌍
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black font-display leading-tight">
            <span className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Francophonie
            </span>
            <br />
            <span className="text-slate-700">Board Game</span>
          </h1>
          <p className="text-slate-500 mt-3 text-sm md:text-base max-w-xs mx-auto">
            Voyagez à travers la Francophonie, répondez aux questions et devenez le{' '}
            <span className="font-bold text-indigo-600">Maître de la Francophonie</span> !
          </p>
        </div>

        {/* Card container */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-6 space-y-5">

          {/* Niveau selection */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Choisissez votre niveau
            </label>
            <div className="space-y-2">
              {NIVEAUX.map(n => (
                <button
                  key={n.id}
                  onClick={() => onSelectNiveau(n.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left ${
                    selectedNiveau === n.id
                      ? n.color + ' shadow-md scale-[1.02]'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{n.emoji}</span>
                  <div>
                    <p className="font-bold text-sm">{n.label}</p>
                    <p className="text-[11px] opacity-70">{n.desc}</p>
                  </div>
                  {selectedNiveau === n.id && (
                    <span className="ml-auto text-xs font-black">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Countries preview */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-3 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-700 mb-2 text-center">10 pays à explorer</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {COUNTRIES.map((f, i) => (
                <span key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.2}s` }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPlay}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4 rounded-2xl shadow-lg text-base flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              JOUER !
            </motion.button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onViewMap}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                <Map className="w-4 h-4" />
                Carte
              </button>
              <button
                onClick={onShowRules}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Règles
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Jeu éducatif · Francophonie · OIF
        </p>
      </motion.div>
    </div>
  );
}
