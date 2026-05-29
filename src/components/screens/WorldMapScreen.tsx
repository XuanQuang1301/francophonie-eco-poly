import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Player } from '../../types';

interface WorldMapScreenProps {
  players: Player[];
  onBack: () => void;
}

// Simplified Francophonie world map using positioned flag pins
const COUNTRY_POSITIONS: { country: string; flag: string; region: string; x: number; y: number; capital: string; fact: string }[] = [
  { country: 'France',       flag: '🇫🇷', region: 'Europe',   x: 46, y: 28, capital: 'Paris',           fact: '67 millions de francophones natifs' },
  { country: 'Belgique',     flag: '🇧🇪', region: 'Europe',   x: 48, y: 24, capital: 'Bruxelles',        fact: '4 communautés linguistiques' },
  { country: 'Suisse',       flag: '🇨🇭', region: 'Europe',   x: 50, y: 27, capital: 'Berne',            fact: '4 langues officielles dont le français' },
  { country: 'Sénégal',      flag: '🇸🇳', region: 'Afrique',  x: 35, y: 52, capital: 'Dakar',            fact: 'Premier pays africain francophone' },
  { country: 'Maroc',        flag: '🇲🇦', region: 'Afrique',  x: 42, y: 38, capital: 'Rabat',            fact: '13 millions de francophones' },
  { country: "Côte d'Ivoire",flag: '🇨🇮', region: 'Afrique',  x: 38, y: 57, capital: 'Abidjan',          fact: 'Plus grand producteur mondial de cacao' },
  { country: 'Québec',       flag: '🇨🇦', region: 'Amérique', x: 18, y: 26, capital: 'Montréal',         fact: '70% du sirop d\'érable mondial' },
  { country: 'Haïti',        flag: '🇭🇹', region: 'Amérique', x: 24, y: 44, capital: 'Port-au-Prince',   fact: 'Premier État noir libre des Amériques (1804)' },
  { country: 'Vietnam',      flag: '🇻🇳', region: 'Asie',     x: 79, y: 48, capital: 'Hanoi',            fact: 'Plus de 6 millions de francophones' },
  { country: 'Liban',        flag: '🇱🇧', region: 'Asie',     x: 61, y: 38, capital: 'Beyrouth',         fact: '\'Paris du Moyen-Orient\'' },
];

const REGION_COLORS: Record<string, string> = {
  Europe:   '#6366f1',
  Afrique:  '#f59e0b',
  Amérique: '#ef4444',
  Asie:     '#10b981',
};

export default function WorldMapScreen({ players, onBack }: WorldMapScreenProps) {
  // Collect all unlocked countries across all players
  const unlockedCountries = new Set(
    players.flatMap(p => p.passportStamps.map(s => s.country))
  );

  return (
    <div className="min-h-screen animated-bg flex flex-col pt-16">
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-white/60 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black font-display text-slate-800">🗺️ Carte de la Francophonie</h1>
            <p className="text-sm text-slate-500">{unlockedCountries.size} / 10 pays visités</p>
          </div>
        </div>

        {/* Map container */}
        <div className="relative bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50 rounded-3xl border border-blue-200 shadow-xl overflow-hidden"
          style={{ paddingBottom: '55%' }}
        >
          {/* Ocean texture */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #bfdbfe 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a5f3fc 0%, transparent 50%)',
            }}
          />

          {/* Country pins */}
          {COUNTRY_POSITIONS.map((c, i) => {
            const unlocked = unlockedCountries.has(c.country);
            return (
              <motion.div
                key={c.country}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                className="absolute group"
                style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Pin */}
                <div className={`relative flex flex-col items-center cursor-pointer transition-transform hover:scale-110`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg border-2 ${
                      unlocked
                        ? 'bg-white border-white shadow-md'
                        : 'bg-slate-300/60 border-slate-400/40 grayscale opacity-60'
                    }`}
                    style={unlocked ? { boxShadow: `0 0 12px ${REGION_COLORS[c.region]}60` } : {}}
                  >
                    {c.flag}
                  </div>

                  {/* Label */}
                  <div className={`mt-1 text-[9px] font-black text-center whitespace-nowrap px-1.5 py-0.5 rounded-full ${
                    unlocked ? 'bg-white/90 text-slate-800' : 'bg-slate-200/60 text-slate-500'
                  }`}>
                    {c.country}
                  </div>

                  {/* Unlock glow */}
                  {unlocked && (
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: REGION_COLORS[c.region] }}
                    />
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-white rounded-xl shadow-xl p-2.5 border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base">{c.flag}</span>
                      <span className="font-black text-xs text-slate-800">{c.country}</span>
                      {unlocked && <span className="text-emerald-500 text-xs ml-auto">✓ Visité</span>}
                    </div>
                    <p className="text-[10px] text-slate-500">🏛️ {c.capital}</p>
                    <p className="text-[10px] text-indigo-600 mt-0.5">{c.fact}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Region legend */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {Object.entries(REGION_COLORS).map(([region, color]) => (
              <div key={region} className="flex items-center gap-1 bg-white/80 rounded-lg px-2 py-1 text-[10px] font-bold shadow-sm">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-slate-700">{region}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player passport overview */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {players.map(p => {
            const uniqueCountries = new Set(p.passportStamps.map(s => s.country)).size;
            return (
              <div key={p.id} className="bg-white/90 rounded-2xl p-3 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{p.avatar}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{p.name}</p>
                    <p className="text-[10px] text-slate-400">{uniqueCountries} pays visités</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.passportStamps
                    .filter((s, i, arr) => arr.findIndex(x => x.country === s.country) === i)
                    .map(s => (
                      <span key={s.country} title={s.country} className="text-base">{s.countryFlag}</span>
                    ))
                  }
                  {p.passportStamps.length === 0 && (
                    <span className="text-[10px] text-slate-300 italic">Aucun tampon</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
