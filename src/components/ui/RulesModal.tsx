import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RulesModalProps {
  show: boolean;
  onClose: () => void;
}

const RULES = [
  { icon: '🎲', title: 'Lancer les dés', text: 'À chaque tour, lancez les dés et déplacez votre pion sur le plateau.' },
  { icon: '🏙️', title: 'Ô Ville', text: 'Répondez à une question culturelle sur le pays. Bonne réponse = +100 pts + tampon Passeport !' },
  { icon: '📘', title: 'Ô Langue', text: 'Question de français (vocab, grammaire, conjugaison). Points selon votre niveau.' },
  { icon: '🎴', title: 'Carte Culture', text: 'Retournez une carte trivia sur la Francophonie. Répondez et gagnez des points.' },
  { icon: '🎲', title: 'Carte Chance', text: 'Bonus ou piège surprise ! Peut vous faire gagner ou perdre des Points Culturels.' },
  { icon: '✈️', title: 'Aéroport', text: 'Téléportez-vous à n\'importe quelle Alliance Française sur le plateau !' },
  { icon: '🎪', title: 'Festival', text: 'Mini-jeu : Escape Quiz chronométré ou Match de Drapeaux. Récompense +200 pts.' },
  { icon: '🤝', title: 'Alliance Française', text: 'Récupérez +75 Points Culturels grâce aux activités culturelles.' },
  { icon: '🏆', title: 'FINALE', text: 'Défi final difficile. Réussir vous rapproche du titre de Maître de la Francophonie !' },
  { icon: '🔒', title: 'Prison', text: 'Passez 3 tours ou attendez. L\'apprentissage continue même en prison !' },
];

const LEVELS = [
  { id: 'debutant', label: 'Débutant', emoji: '🟢', desc: 'Couleurs, chiffres, salutations, pays' },
  { id: 'intermediaire', label: 'Intermédiaire', emoji: '🟡', desc: 'Conjugaison, géographie, passé composé' },
  { id: 'avance', label: 'Avancé', emoji: '🔴', desc: 'Idiomes, subjonctif, culture générale' },
];

export default function RulesModal({ show, onClose }: RulesModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-t-3xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black font-display">📖 Règles du Jeu</h2>
                <p className="text-indigo-200 text-xs mt-0.5">Francophonie Board — Guide du voyageur culturel</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Objective */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
                <h3 className="font-black text-amber-800 mb-1">🎯 Objectif</h3>
                <p className="text-sm text-amber-700">
                  Devenez <strong>Maître de la Francophonie</strong> en collectant le plus de <strong>Points Culturels</strong> 
                  et en obtenant des tampons Passeport dans un maximum de pays !
                </p>
              </div>

              {/* Tile types */}
              <div>
                <h3 className="font-black text-slate-700 mb-3 text-sm uppercase tracking-wide">Types d'ô</h3>
                <div className="grid grid-cols-1 gap-2">
                  {RULES.map(r => (
                    <div key={r.title} className="flex gap-3 items-start bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <span className="text-xl shrink-0">{r.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{r.title}</p>
                        <p className="text-xs text-slate-500">{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div>
                <h3 className="font-black text-slate-700 mb-3 text-sm uppercase tracking-wide">Niveaux de difficulté</h3>
                <div className="space-y-2">
                  {LEVELS.map(l => (
                    <div key={l.id} className="flex gap-3 items-center bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <span className="text-xl">{l.emoji}</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{l.label}</p>
                        <p className="text-xs text-slate-500">{l.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Points */}
              <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <h3 className="font-black text-indigo-800 mb-2 text-sm">💎 Points Culturels</h3>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {[
                    ['Réponse correcte (Ville/Langue)', '+100 pts'],
                    ['Niveau intermédiaire', '+150 pts'],
                    ['Niveau avancé', '+200 pts'],
                    ['Série de 3 bonnes réponses', '+50 bonus'],
                    ['Mini-jeu gagné', '+200 pts'],
                    ['Alliance Française', '+75 pts'],
                    ['Passer par DÉPART', '+50 pts'],
                    ['Réponse incorrecte', '-0 pts (perte de tour)'],
                  ].map(([a, b]) => (
                    <div key={a} className="contents">
                      <span className="text-indigo-700">{a}</span>
                      <span className="font-bold text-indigo-900 text-right">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl transition-colors"
              >
                Bonne chance, voyageur ! 🌍
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
