import { Player } from '../../types';
import { motion } from 'motion/react';

interface PlayerHUDProps {
  players: Player[];
  currentPlayerIndex: number;
}

const NIVEAU_LABEL: Record<string, { label: string; color: string; emoji: string }> = {
  debutant:      { label: 'Débutant',      color: 'text-emerald-600', emoji: '🟢' },
  intermediaire: { label: 'Intermédiaire', color: 'text-amber-600',   emoji: '🟡' },
  avance:        { label: 'Avancé',        color: 'text-rose-600',    emoji: '🔴' },
};

export default function PlayerHUD({ players, currentPlayerIndex }: PlayerHUDProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1 px-1">Joueurs</h3>
      {players.map((player, idx) => {
        const isActive = idx === currentPlayerIndex;
        const niv = NIVEAU_LABEL[player.niveau];
        const stampCount = player.passportStamps.length;
        const uniqueCountries = new Set(player.passportStamps.map(s => s.country)).size;

        return (
          <motion.div
            key={player.id}
            layout
            className={`rounded-2xl p-3 border-2 transition-all duration-300 ${
              isActive
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md pulse-glow'
                : 'border-slate-200 bg-white'
            }`}
          >
            {/* Top row: avatar + name + active badge */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 shadow-sm shrink-0"
                style={{ borderColor: player.color, backgroundColor: `${player.color}18` }}
              >
                {player.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-800 truncate">{player.name}</span>
                  {isActive && (
                    <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse shrink-0">
                      Tour
                    </span>
                  )}
                  {player.isBot && (
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1 py-0.5 rounded-full font-bold shrink-0">🤖</span>
                  )}
                </div>
                <span className={`text-[10px] font-bold ${niv.color}`}>{niv.emoji} {niv.label}</span>
              </div>
            </div>

            {/* Points */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500">Points Culturels</span>
              <span className="text-sm font-black text-indigo-700">
                {player.culturalPoints.toLocaleString('fr-FR')} 💎
              </span>
            </div>

            {/* Passport stamps */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[10px] text-slate-400 mr-1">Passeport:</span>
              {uniqueCountries === 0 && (
                <span className="text-[10px] text-slate-300 italic">Aucun tampon</span>
              )}
              {player.passportStamps
                .filter((s, i, arr) => arr.findIndex(x => x.country === s.country) === i)
                .map(stamp => (
                  <span key={stamp.country} title={stamp.country} className="text-base leading-none">
                    {stamp.countryFlag}
                  </span>
                ))
              }
              {stampCount > 0 && (
                <span className="text-[10px] text-purple-600 font-bold ml-auto">
                  {uniqueCountries} pays
                </span>
              )}
            </div>

            {/* Streak */}
            {player.streakCount >= 2 && (
              <div className="mt-1.5 text-[10px] text-amber-600 font-bold flex items-center gap-1">
                🔥 Série de {player.streakCount} bonnes réponses !
                {player.streakCount >= 3 && <span className="text-amber-500">+50 pts bonus</span>}
              </div>
            )}

            {/* Jailed indicator */}
            {player.isJailed && (
              <div className="mt-1.5 text-[10px] text-rose-600 font-bold">
                🔒 En prison ({player.jailTurns}/3 tours)
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
