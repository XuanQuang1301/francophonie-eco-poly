import { motion } from 'motion/react';
import {
  ArrowUpRight, Lock, Gavel, TreePine, Plane, Music, HandshakeIcon, Trophy, Scale
} from 'lucide-react';
import { BoardSpace, Player } from '../../types';

interface BoardTileProps {
  space: BoardSpace;
  players: Player[];
  isActive: boolean;
  onClick: () => void;
}

// ── Color band by position ─────────────────────────────────────
function getBandClass(space: BoardSpace): string {
  if (!space.colorClass) return '';
  const { col, row } = space;
  if (row === 1) return `band-top ${space.colorClass}`;
  if (row === 9) return `band-bottom ${space.colorClass}`;
  if (col === 1) return `band-left ${space.colorClass}`;
  if (col === 9) return `band-right ${space.colorClass}`;
  return '';
}

// ── Corner tile content ────────────────────────────────────────
function CornerContent({ space }: { space: BoardSpace }) {
  switch (space.type) {
    case 'start':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <ArrowUpRight className="w-7 h-7 text-emerald-600" />
          <span className="text-[9px] font-black text-emerald-700 uppercase">DÉPART</span>
        </div>
      );
    case 'go-to-jail':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <Gavel className="w-6 h-6 text-rose-600" />
          <span className="text-[8px] font-black text-rose-700 text-center leading-tight uppercase">Allez en<br/>Prison</span>
        </div>
      );
    case 'free-parking':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <TreePine className="w-6 h-6 text-emerald-600" />
          <span className="text-[8px] font-black text-emerald-700 text-center leading-tight">Parc<br/>Gratuit</span>
        </div>
      );
    case 'jail':
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <Lock className="w-6 h-6 text-slate-500" />
          <span className="text-[8px] font-black text-slate-600">Prison</span>
        </div>
      );
    default:
      return null;
  }
}

// ── Special tile icon ──────────────────────────────────────────
function SpecialIcon({ type }: { type: string }) {
  switch (type) {
    case 'aeroport':
      return <Plane className="w-5 h-5 text-cyan-600" />;
    case 'festival':
      return <Music className="w-5 h-5 text-purple-600 animate-pulse" />;
    case 'alliance':
      return <HandshakeIcon className="w-5 h-5 text-emerald-600" />;
    case 'finale':
      return <Trophy className="w-5 h-5 text-amber-500 animate-pulse" />;
    case 'carte-chance':
      return <span className="text-lg">🎲</span>;
    case 'carte-culture':
      return <Scale className="w-5 h-5 text-pink-600" />;
    default:
      return null;
  }
}

const TYPE_LABELS: Partial<Record<string, string>> = {
  'aeroport':     'AÉROPORT',
  'festival':     'FESTIVAL',
  'alliance':     'ALLIANCE',
  'finale':       'FINALE',
  'carte-chance': 'CHANCE',
  'carte-culture':'CULTURE',
};

const TYPE_COLORS: Partial<Record<string, string>> = {
  'aeroport':     'text-cyan-700',
  'festival':     'text-purple-700',
  'alliance':     'text-emerald-700',
  'finale':       'text-amber-700',
  'carte-chance': 'text-violet-700',
  'carte-culture':'text-pink-700',
};

export default function BoardTile({ space, players, isActive, onClick }: BoardTileProps) {
  const isCorner = ['start','jail','go-to-jail','free-parking'].includes(space.type);
  const playersHere = players.filter(p => p.position === space.id);
  const bandClass = getBandClass(space);
  const label = TYPE_LABELS[space.type];
  const labelColor = TYPE_COLORS[space.type] ?? 'text-slate-600';

  return (
    <div
      onClick={onClick}
      className={`tile ${isCorner ? 'corner-tile' : ''} ${
        isActive ? 'ring-2 ring-amber-400 z-20 shadow-lg shadow-amber-200' : ''
      }`}
    >
      {/* Color band */}
      {bandClass && <div className={bandClass} />}

      <div className="relative flex flex-col items-center justify-between h-full w-full py-1 px-0.5">

        {/* Name */}
        {isCorner ? (
          <div className="flex items-center justify-center flex-1 w-full">
            <CornerContent space={space} />
          </div>
        ) : (
          <>
            {/* Special types */}
            {label ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-0.5 py-1">
                <span className={`text-[8px] font-black uppercase tracking-wide ${labelColor}`}>{label}</span>
                <SpecialIcon type={space.type} />
              </div>
            ) : (
              /* Ville or Langue */
              <div className="flex flex-col items-center justify-between flex-1 w-full">
                {/* Country flag */}
                {space.countryFlag && (
                  <span className="text-sm leading-none mt-1">{space.countryFlag}</span>
                )}
                {/* City/tile name */}
                <span className="text-[8px] md:text-[9px] font-bold text-slate-800 text-center leading-tight px-0.5 line-clamp-2 mt-0.5">
                  {space.name}
                </span>
                {/* Ville/Langue badge */}
                <span className={`text-[7px] font-black uppercase px-1 py-0.5 rounded mb-0.5 ${
                  space.type === 'ville' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {space.type === 'ville' ? '🏙️' : '📘'}
                </span>
              </div>
            )}
          </>
        )}

        {/* Player tokens */}
        {playersHere.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="flex flex-wrap gap-0.5 justify-center">
              {playersHere.map(p => (
                <motion.span
                  key={p.id}
                  layoutId={`token-${p.id}`}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  className="text-sm md:text-base leading-none drop-shadow-md bg-white rounded-full p-0.5 border-2"
                  style={{ borderColor: p.color }}
                >
                  {p.avatar}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
