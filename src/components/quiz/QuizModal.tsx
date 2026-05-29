import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { QuizQuestion, Player } from '../../types';

interface QuizModalProps {
  question: QuizQuestion;
  player: Player;
  onClose: (correct: boolean, points: number) => void;
}

export default function QuizModal({ question, player, onClose }: QuizModalProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(20);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (!timerActive || answered) return;
    if (timer <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, answered]);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setTimerActive(false);
    setSelected(idx);
    setAnswered(true);
    const correct = idx === question.answerIndex;
    setTimeout(() => onClose(correct, correct ? question.pointsValue : 0), 2800);
  };

  const TYPE_LABEL: Record<string, { label: string; color: string; emoji: string }> = {
    ville:   { label: 'Question Culturelle', color: 'from-indigo-600 to-purple-600', emoji: '🏙️' },
    langue:  { label: 'Question de Langue',  color: 'from-blue-600 to-cyan-600',    emoji: '📘' },
    culture: { label: 'Carte Culture',       color: 'from-pink-600 to-rose-600',    emoji: '🎴' },
  };
  const tl = TYPE_LABEL[question.type];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-indigo-900/50 backdrop-blur-sm p-3"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
      >
        {/* Gradient header */}
        <div className={`bg-gradient-to-r ${tl.color} p-4 text-white`}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{tl.emoji}</span>
              <div>
                <div className="text-[10px] font-bold opacity-80 uppercase tracking-wider">{tl.label}</div>
                {question.country && (
                  <div className="text-sm font-black">{question.countryFlag} {question.country}</div>
                )}
              </div>
            </div>
            {/* Timer */}
            <div className={`w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center font-black text-lg transition-colors ${
              timer <= 5 ? 'bg-red-500/80 animate-pulse' : 'bg-white/20'
            }`}>
              {timer}
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-1 mt-2">
            <div
              className="bg-white h-full rounded-full progress-bar"
              style={{ width: `${(timer / 20) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4">
          {/* Question */}
          <p className="text-sm font-bold text-slate-800 mb-4 leading-snug text-center">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-2 mb-3">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.answerIndex;
              const isSelected = i === selected;
              let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300';
              if (answered) {
                if (isCorrect) cls = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
                else if (isSelected && !isCorrect) cls = 'bg-rose-50 border-rose-400 text-rose-700';
                else cls = 'bg-slate-50 border-slate-200 text-slate-400';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs text-left transition-all flex items-center gap-2 ${cls}`}
                >
                  <span className="w-5 h-5 rounded-full bg-white border border-current flex items-center justify-center font-black text-[10px] shrink-0">
                    {answered && isCorrect ? <Check className="w-3 h-3 text-emerald-600" /> :
                     answered && isSelected ? <X className="w-3 h-3 text-rose-600" /> :
                     String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                  {answered && isCorrect && (
                    <span className="ml-auto text-[10px] font-black text-emerald-600">+{question.pointsValue} 💎</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {answered && question.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-xs text-blue-700"
              >
                <span className="font-bold">💡 </span>{question.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Player info */}
          <div className="mt-3 text-center text-xs text-slate-400">
            {player.avatar} {player.name}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
