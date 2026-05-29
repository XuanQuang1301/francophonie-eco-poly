import { TransactionLog } from '../../types';

const TYPE_STYLES: Record<TransactionLog['type'], string> = {
  info:     'bg-slate-50 border-slate-200 text-slate-600',
  quiz:     'bg-indigo-50 border-indigo-200 text-indigo-700',
  stamp:    'bg-purple-50 border-purple-200 text-purple-700',
  jail:     'bg-rose-50 border-rose-200 text-rose-700',
  depart:   'bg-emerald-50 border-emerald-200 text-emerald-700',
  minigame: 'bg-amber-50 border-amber-200 text-amber-700',
  carte:    'bg-pink-50 border-pink-200 text-pink-700',
};

interface ActivityLogProps {
  logs: TransactionLog[];
}

export default function ActivityLog({ logs }: ActivityLogProps) {
  return (
    <div className="flex flex-col gap-0">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
        Journal d'activité
      </h3>
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {logs.slice(0, 20).map((log) => (
          <div
            key={log.id}
            className={`flex items-start gap-2 p-2 rounded-xl border text-xs ${TYPE_STYLES[log.type]} transition-all`}
          >
            <span className="text-base shrink-0 leading-none mt-0.5">{log.playerAvatar}</span>
            <div className="min-w-0">
              <span className="font-bold">{log.playerName}</span>{' '}
              <span className="leading-snug">{log.message}</span>
            </div>
            <span className="ml-auto text-[10px] opacity-50 shrink-0 whitespace-nowrap">{log.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
