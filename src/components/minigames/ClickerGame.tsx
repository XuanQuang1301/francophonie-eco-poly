import { useState } from 'react';
import { motion } from 'motion/react';

interface ClickerGameProps {
  reward: number;
  isBot: boolean;
  onComplete: (success: boolean) => void;
}

const TARGET = 15;
const TIME_LIMIT = 7;

export default function ClickerGame({ reward, isBot, onComplete }: ClickerGameProps) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  // Auto-resolve for bots
  if (isBot && !done) {
    setTimeout(() => { setDone(true); onComplete(Math.random() > 0.3); }, 2000);
  }

  const startTimer = () => {
    if (started) return;
    setStarted(true);
    const interval = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) {
          clearInterval(interval);
          setDone(true);
          onComplete(count >= TARGET);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
  };

  const handleTap = () => {
    if (done) return;
    startTimer();
    const next = count + 1;
    setCount(next);
    if (next >= TARGET) {
      setDone(true);
      onComplete(true);
    }
  };

  const pct = Math.min((count / TARGET) * 100, 100);

  return (
    <div className="space-y-4 text-center">
      <div className="text-sm font-bold text-slate-700">
        🎯 Cliquez <strong>{TARGET} fois</strong> en <strong>{TIME_LIMIT} secondes</strong> !
      </div>

      {/* Progress */}
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full progress-bar" style={{ width: `${pct}%` }} />
      </div>

      <div className="flex justify-between text-xs text-slate-500">
        <span>{count} / {TARGET} taps</span>
        <span className={timeLeft <= 3 && started ? 'text-rose-600 font-bold animate-pulse' : ''}>
          ⏱ {timeLeft}s
        </span>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleTap}
        disabled={done}
        className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black py-6 rounded-2xl shadow-lg text-xl disabled:opacity-50 select-none"
      >
        {done ? (count >= TARGET ? '🎉 Réussi !' : '⏰ Trop lent !') : '🖱️ TAPEZ ICI !'}
      </motion.button>

      <p className="text-xs text-slate-400">Récompense : +{reward} 💎</p>
    </div>
  );
}
