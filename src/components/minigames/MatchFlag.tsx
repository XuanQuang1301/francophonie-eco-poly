import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';

const FLAGS = [
  { flag: '🇫🇷', country: 'France', capital: 'Paris' },
  { flag: '🇧🇪', country: 'Belgique', capital: 'Bruxelles' },
  { flag: '🇨🇭', country: 'Suisse', capital: 'Berne' },
  { flag: '🇸🇳', country: 'Sénégal', capital: 'Dakar' },
  { flag: '🇲🇦', country: 'Maroc', capital: 'Rabat' },
  { flag: '🇨🇮', country: "Côte d'Ivoire", capital: 'Yamoussoukro' },
  { flag: '🇨🇦', country: 'Québec', capital: 'Montréal' },
  { flag: '🇭🇹', country: 'Haïti', capital: 'Port-au-Prince' },
  { flag: '🇻🇳', country: 'Vietnam', capital: 'Hanoi' },
  { flag: '🇱🇧', country: 'Liban', capital: 'Beyrouth' },
];

interface MatchFlagProps {
  reward: number;
  isBot: boolean;
  onComplete: (success: boolean) => void;
}

export default function MatchFlag({ reward, isBot, onComplete }: MatchFlagProps) {
  const [pairs] = useState(() => FLAGS.sort(() => Math.random() - 0.5).slice(0, 4));
  const [currentFlagIdx, setCurrentFlagIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  // Shuffle answer options
  const [options] = useState(() => {
    return pairs.map((_, qIdx) => {
      const correct = pairs[qIdx];
      const wrong = FLAGS
        .filter(f => f.country !== correct.country)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      return [correct, ...wrong].sort(() => Math.random() - 0.5).map(f => f.country);
    });
  });

  useEffect(() => {
    if (isBot && !done) {
      setTimeout(() => { setDone(true); onComplete(Math.random() > 0.3); }, 2000);
    }
  }, [isBot]);

  const handleAnswer = (ans: string) => {
    if (answered || done) return;
    setSelectedAnswer(ans);
    setAnswered(true);
    const correct = ans === pairs[currentFlagIdx].country;
    if (correct) setScore(p => p + 1);

    setTimeout(() => {
      if (currentFlagIdx + 1 >= pairs.length) {
        setDone(true);
        const finalScore = score + (correct ? 1 : 0);
        onComplete(finalScore >= Math.ceil(pairs.length / 2));
      } else {
        setCurrentFlagIdx(p => p + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      }
    }, 1200);
  };

  if (isBot) {
    return (
      <div className="text-center py-8 text-slate-500">
        <div className="text-4xl mb-3 animate-bounce">🤖</div>
        <p className="text-sm font-bold">Le robot associe les drapeaux…</p>
      </div>
    );
  }

  const current = pairs[currentFlagIdx];
  const currentOptions = options[currentFlagIdx];

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex justify-between text-xs text-slate-500">
        <span>Drapeau {currentFlagIdx + 1} / {pairs.length}</span>
        <span className="text-emerald-600 font-bold">{score} ✓</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-amber-500 h-full rounded-full progress-bar" style={{ width: `${(currentFlagIdx / pairs.length) * 100}%` }} />
      </div>

      {/* Flag display */}
      <div className="text-center py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFlagIdx}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-7xl mb-2"
          >
            {current.flag}
          </motion.div>
        </AnimatePresence>
        <p className="text-xs text-slate-400">Quel pays représente ce drapeau ?</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {currentOptions.map((opt) => {
          const isCorrect = opt === current.country;
          const isSelected = opt === selectedAnswer;
          let cls = 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300';
          if (answered) {
            if (isCorrect) cls = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
            else if (isSelected) cls = 'bg-rose-50 border-rose-400 text-rose-700';
            else cls = 'bg-slate-50 border-slate-200 text-slate-400';
          }
          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1 ${cls}`}
            >
              {answered && isCorrect && <Check className="w-3 h-3 text-emerald-600" />}
              {answered && isSelected && !isCorrect && <X className="w-3 h-3 text-rose-600" />}
              {opt}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 text-center">🚩 Associez le drapeau à son pays · +{reward} 💎</p>
    </div>
  );
}
