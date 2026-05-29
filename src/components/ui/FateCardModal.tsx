import { motion, AnimatePresence } from 'motion/react';
import { CarteChance, CarteCulture } from '../../types';
import { useState } from 'react';
import { X, Check } from 'lucide-react';

// ── Carte Chance popup ─────────────────────────────────────────────────────
interface CarteChanceModalProps {
  carte: CarteChance;
  onClose: () => void;
}

export function CarteChanceModal({ carte, onClose }: CarteChanceModalProps) {
  const isPositive = carte.pointsChange > 0;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-purple-900/40 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -6 }} animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-xs border-2 border-purple-200 text-center"
      >
        <div className="text-5xl mb-3">{carte.icon}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1">CARTE CHANCE</div>
        <h3 className="text-lg font-black text-slate-900 mb-3">{carte.title}</h3>
        <p className="text-sm text-slate-600 mb-4">{carte.description}</p>
        <div className={`text-2xl font-black mb-4 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? '+' : ''}{carte.pointsChange} 💎
        </div>
        {carte.effect === 'skip-turn' && (
          <div className="text-xs text-rose-600 font-bold mb-3">⚠️ Vous perdez votre prochain tour !</div>
        )}
        {carte.effect === 'extra-turn' && (
          <div className="text-xs text-emerald-600 font-bold mb-3">🎉 Vous jouez à nouveau !</div>
        )}
        <button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors"
        >
          Compris !
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Carte Culture popup (with quiz) ───────────────────────────────────────
interface CarteCultureModalProps {
  carte: CarteCulture;
  onClose: (earned: number) => void;
}

export function CarteCultureModal({ carte, onClose }: CarteCultureModalProps) {
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setTimeout(() => onClose(idx === carte.answerIndex ? carte.pointsValue : 0), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-pink-900/40 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-5 w-full max-w-sm border-2 border-pink-200"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div className="text-3xl mb-1">{carte.countryFlag}</div>
          <div className="text-[10px] font-black uppercase tracking-widest text-pink-500">CARTE CULTURE</div>
          <p className="text-sm font-bold text-slate-700 mt-1">{carte.country}</p>
        </div>

        {/* Question */}
        <div className="bg-pink-50 rounded-2xl p-3 mb-3 border border-pink-100">
          <p className="text-sm font-bold text-slate-800 text-center">{carte.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-2 mb-3">
          {carte.options.map((opt, i) => {
            const isCorrect = i === carte.answerIndex;
            const isSelected = i === selected;
            let cls = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
            if (answered) {
              if (isCorrect) cls = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
              else if (isSelected) cls = 'bg-rose-50 border-rose-400 text-rose-700';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full py-2 px-3 rounded-xl border text-xs text-left transition-all flex items-center gap-2 ${cls}`}
              >
                <span className="font-black">{String.fromCharCode(65 + i)}.</span>
                <span>{opt}</span>
                {answered && isCorrect && <Check className="w-3 h-3 ml-auto text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Fact after answering */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-50 rounded-xl p-3 border border-indigo-100 text-xs text-indigo-700"
            >
              <span className="font-bold">💡 Le saviez-vous ? </span>{carte.fact}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
