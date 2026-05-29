import { motion, AnimatePresence } from 'motion/react';
import { Player } from '../../types';

interface PassportViewProps {
  player: Player;
  onClose: () => void;
}

const REGIONS = [
  { id: 'Europe',   emoji: '🏛️', color: 'from-blue-500 to-indigo-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  { id: 'Afrique',  emoji: '🌍', color: 'from-amber-500 to-orange-600',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  { id: 'Amérique', emoji: '🗽', color: 'from-red-500 to-rose-600',      bg: 'bg-red-50',    border: 'border-red-200' },
  { id: 'Asie',     emoji: '🏮', color: 'from-emerald-500 to-teal-600',  bg: 'bg-emerald-50',border: 'border-emerald-200' },
] as const;

export default function PassportView({ player, onClose }: PassportViewProps) {
  // Deduplicate stamps by country
  const uniqueStamps = player.passportStamps.filter(
    (s, i, arr) => arr.findIndex(x => x.country === s.country) === i
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, rotateX: -10, y: 30 }}
          animate={{ scale: 1, rotateX: 0, y: 0 }}
          transition={{ type: 'spring', bounce: 0.25 }}
          className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Passport cover */}
          <div className="p-5 text-center border-b border-white/10">
            <div className="text-4xl mb-2">📗</div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-1">
              Organisation Internationale de la Francophonie
            </div>
            <h2 className="text-xl font-black text-white font-display">PASSEPORT CULTUREL</h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-2xl">{player.avatar}</span>
              <span className="text-white font-bold">{player.name}</span>
            </div>
            <div className="mt-2 text-indigo-300 text-xs">
              {uniqueStamps.length} / 10 pays visités
            </div>
            {/* Progress bar */}
            <div className="mt-2 w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full progress-bar"
                style={{ width: `${(uniqueStamps.length / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Stamps by region */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {REGIONS.map(region => {
              const regionStamps = uniqueStamps.filter(s => s.region === region.id);
              return (
                <div key={region.id} className={`rounded-2xl p-3 border ${region.bg} ${region.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{region.emoji}</span>
                    <span className={`text-xs font-black bg-gradient-to-r ${region.color} bg-clip-text text-transparent uppercase tracking-wide`}>
                      {region.id}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-500">{regionStamps.length} tampon{regionStamps.length !== 1 ? 's' : ''}</span>
                  </div>
                  {regionStamps.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-1">Aucun tampon — visitez cette région !</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {regionStamps.map((stamp, i) => (
                        <motion.div
                          key={stamp.country}
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.08, type: 'spring' }}
                          className="flex flex-col items-center bg-white rounded-xl p-2 shadow-sm border border-white/80 min-w-[60px]"
                        >
                          <span className="text-2xl">{stamp.countryFlag}</span>
                          <span className="text-[9px] font-bold text-slate-600 text-center mt-1 leading-tight">
                            {stamp.country}
                          </span>
                          <div className="w-full h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded mt-1" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
            >
              Fermer le Passeport
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
