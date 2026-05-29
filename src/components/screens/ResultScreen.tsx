import { motion } from 'motion/react';
import { Player } from '../../types';
import { Trophy, RotateCcw, Map } from 'lucide-react';

interface ResultScreenProps {
  players: Player[];
  onRestart: () => void;
  onViewMap: () => void;
}

export default function ResultScreen({ players, onRestart, onViewMap }: ResultScreenProps) {
  const sorted = [...players].sort((a, b) => b.culturalPoints - a.culturalPoints);
  const winner = sorted[0];
  const uniqueWinnerCountries = new Set(winner.passportStamps.map(s => s.country)).size;
  const isMaitre = uniqueWinnerCountries >= 6;

  return (
    <div className="min-h-screen animated-bg flex flex-col items-center justify-center px-4 pt-16 pb-10">

      {/* Confetti-like floating emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['🎉','⭐','🏆','🌟','💎','🎊','🌍','📗'].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            style={{ left: `${(i * 13 + 5) % 95}%`, top: '-10%' }}
            animate={{ y: ['0vh', '120vh'], rotate: [0, 360], opacity: [1, 0.5, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'linear' }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="w-full max-w-lg z-10"
      >
        {/* Winner card */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-6 text-white text-center mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-3"
          >
            {isMaitre ? '👑' : '🏆'}
          </motion.div>

          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-200 mb-1">
            {isMaitre ? 'MAÎTRE DE LA FRANCOPHONIE' : 'VAINQUEUR'}
          </div>

          <div className="text-5xl mb-2">{winner.avatar}</div>
          <h1 className="text-3xl font-black font-display mb-1">{winner.name}</h1>
          <div className="text-2xl font-black text-yellow-300 mb-3">
            {winner.culturalPoints.toLocaleString('fr-FR')} 💎
          </div>

          {isMaitre && (
            <div className="bg-white/15 rounded-2xl p-3 mb-3">
              <p className="text-sm font-bold">
                🌍 {winner.name} a visité <strong>{uniqueWinnerCountries} pays</strong> de la Francophonie
                et mérite le titre de <strong>Maître de la Francophonie</strong> !
              </p>
            </div>
          )}

          {/* Winner stamps */}
          <div className="flex flex-wrap gap-1 justify-center">
            {winner.passportStamps
              .filter((s, i, arr) => arr.findIndex(x => x.country === s.country) === i)
              .map(s => (
                <span key={s.country} title={s.country} className="text-2xl">{s.countryFlag}</span>
              ))
            }
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white p-4 mb-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3 text-center">
            🏅 Classement Final
          </h2>
          <div className="space-y-2">
            {sorted.map((p, i) => {
              const countries = new Set(p.passportStamps.map(s => s.country)).size;
              const medals = ['🥇','🥈','🥉','4️⃣'];
              return (
                <motion.div
                  key={p.id}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-2xl ${
                    i === 0 ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300' : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{medals[i]}</span>
                  <span className="text-xl">{p.avatar}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{p.name}</p>
                    <p className="text-[10px] text-slate-500">{countries} pays · {p.streakCount} série max</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-indigo-700">{p.culturalPoints.toLocaleString('fr-FR')} 💎</p>
                    <div className="flex gap-0.5 justify-end mt-0.5">
                      {p.passportStamps
                        .filter((s, si, arr) => arr.findIndex(x => x.country === s.country) === si)
                        .slice(0, 5)
                        .map(s => <span key={s.country} className="text-xs">{s.countryFlag}</span>)
                      }
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onViewMap}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-slate-700 font-bold text-sm transition-colors shadow-sm"
          >
            <Map className="w-4 h-4" />
            Voir la Carte
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm transition-all shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Rejouer !
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Merci d'avoir joué à Francophonie Board ! 🌍
        </p>
      </motion.div>
    </div>
  );
}
