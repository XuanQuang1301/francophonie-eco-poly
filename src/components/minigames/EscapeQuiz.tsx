import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';

const ESCAPE_QUESTIONS = [
  { q: 'Quelle est la capitale de la France ?', opts: ['Lyon', 'Paris', 'Marseille', 'Nice'], a: 1 },
  { q: 'Comment dit-on "thank you" en français ?', opts: ['Bonjour', 'Merci', 'Au revoir', 'S\'il vous plaît'], a: 1 },
  { q: 'Quelle est la capitale du Sénégal ?', opts: ['Abidjan', 'Bamako', 'Dakar', 'Conakry'], a: 2 },
  { q: 'Complète : "Nous ___ étudiants."', opts: ['es', 'êtes', 'suis', 'sommes'], a: 3 },
  { q: 'Quel est le drapeau du Québec ?', opts: ['🍁 Rouge et blanc', '⚜️ Bleu et blanc', '🔴 Rouge et vert', '⚪ Blanc'], a: 1 },
  { q: '"Au revoir" signifie…', opts: ['Hello', 'Thank you', 'Goodbye', 'Sorry'], a: 2 },
  { q: 'Quel pays a 4 langues officielles ?', opts: ['France', 'Belgique', 'Suisse', 'Canada'], a: 2 },
  { q: 'Le Phở est un plat de…', opts: ['Maroc', 'Haïti', 'Vietnam', 'Liban'], a: 2 },
];

interface EscapeQuizProps {
  reward: number;
  isBot: boolean;
  onComplete: (success: boolean) => void;
}

const TOTAL_QUESTIONS = 3;
const TIME_PER_Q = 10;

export default function EscapeQuiz({ reward, isBot, onComplete }: EscapeQuizProps) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(TIME_PER_Q);
  const [finished, setFinished] = useState(false);

  // Pick random questions
  const [questions] = useState(() => {
    const shuffled = [...ESCAPE_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, TOTAL_QUESTIONS);
  });

  useEffect(() => {
    if (isBot && !finished) {
      setTimeout(() => { setFinished(true); onComplete(Math.random() > 0.35); }, 2500);
    }
  }, [isBot]);

  useEffect(() => {
    if (finished || answered || isBot) return;
    if (timer <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, answered, finished, isBot]);

  const handleAnswer = (idx: number) => {
    if (answered || finished) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === questions[qIdx].a;
    if (correct) setScore(p => p + 1);
    setTimeout(() => {
      if (qIdx + 1 >= TOTAL_QUESTIONS) {
        setFinished(true);
        onComplete(score + (correct ? 1 : 0) >= Math.ceil(TOTAL_QUESTIONS / 2));
      } else {
        setQIdx(p => p + 1);
        setSelected(null);
        setAnswered(false);
        setTimer(TIME_PER_Q);
      }
    }, 1200);
  };

  if (isBot) {
    return (
      <div className="text-center py-8 text-slate-500">
        <div className="text-4xl mb-3 animate-bounce">🤖</div>
        <p className="text-sm font-bold">Le robot répond aux questions…</p>
      </div>
    );
  }

  const q = questions[qIdx];
  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-500 font-bold">Question {qIdx + 1}/{TOTAL_QUESTIONS}</span>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">{score} ✓</span>
          <span className={`font-mono font-black px-2 py-0.5 rounded-full text-white text-xs ${
            timer <= 4 ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'
          }`}>{timer}s</span>
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5">
        <div className="bg-indigo-500 h-full rounded-full progress-bar" style={{ width: `${((qIdx)/TOTAL_QUESTIONS)*100}%` }} />
      </div>

      {/* Question */}
      <div className="bg-indigo-50 rounded-2xl p-3 border border-indigo-100 text-center">
        <p className="text-sm font-bold text-slate-800">{q.q}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {q.opts.map((opt, i) => {
          const isCorrect = i === q.a;
          const isSelected = i === selected;
          let cls = 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300';
          if (answered) {
            if (isCorrect) cls = 'bg-emerald-50 border-emerald-400 text-emerald-800';
            else if (isSelected) cls = 'bg-rose-50 border-rose-400 text-rose-700';
            else cls = 'bg-slate-50 border-slate-200 text-slate-400';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1 ${cls}`}
            >
              {answered && isCorrect && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
              {answered && isSelected && !isCorrect && <X className="w-3 h-3 text-rose-600 shrink-0" />}
              {opt}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 text-center">Récompense : +{reward} 💎 si vous répondez juste à {Math.ceil(TOTAL_QUESTIONS/2)}+ questions</p>
    </div>
  );
}
