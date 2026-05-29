import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ══════════════════════════════════════════════════════
  // VILLE — France 🇫🇷
  // ══════════════════════════════════════════════════════
  { id: 1, type: 'ville', country: 'France', countryFlag: '🇫🇷', region: 'Europe',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle est la capitale de la France ?',
    options: ['Lyon', 'Paris', 'Bordeaux', 'Marseille'], answerIndex: 1,
    explanation: 'Paris est la capitale et la plus grande ville de France.' },
  { id: 2, type: 'ville', country: 'France', countryFlag: '🇫🇷', region: 'Europe',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quel est le monument le plus célèbre de Paris ?',
    options: ['Arc de Triomphe', 'Musée du Louvre', 'Tour Eiffel', 'Notre-Dame'], answerIndex: 2,
    explanation: 'La Tour Eiffel a été construite en 1889 par Gustave Eiffel.' },
  { id: 3, type: 'ville', country: 'France', countryFlag: '🇫🇷', region: 'Europe',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quelle rivière traverse Paris ?',
    options: ['La Loire', 'Le Rhône', 'La Seine', 'La Garonne'], answerIndex: 2,
    explanation: 'La Seine traverse Paris sur 13 km avant de rejoindre la Manche.' },
  { id: 4, type: 'ville', country: 'France', countryFlag: '🇫🇷', region: 'Europe',
    difficulty: 'avance', pointsValue: 200,
    question: 'En quelle année la Tour Eiffel a-t-elle été inaugurée ?',
    options: ['1875', '1889', '1900', '1920'], answerIndex: 1,
    explanation: 'La Tour Eiffel fut inaugurée le 31 mars 1889 pour l\'Exposition universelle.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Belgique 🇧🇪
  // ══════════════════════════════════════════════════════
  { id: 5, type: 'ville', country: 'Belgique', countryFlag: '🇧🇪', region: 'Europe',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle est la capitale de la Belgique ?',
    options: ['Bruges', 'Anvers', 'Gand', 'Bruxelles'], answerIndex: 3,
    explanation: 'Bruxelles est à la fois capitale de la Belgique et siège de l\'Union Européenne.' },
  { id: 6, type: 'ville', country: 'Belgique', countryFlag: '🇧🇪', region: 'Europe',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quel personnage de BD est le plus célèbre de Belgique ?',
    options: ['Astérix', 'Tintin', 'Lucky Luke', 'Le Petit Prince'], answerIndex: 1,
    explanation: 'Tintin est créé par Hergé (Georges Remi) à Bruxelles en 1929.' },
  { id: 7, type: 'ville', country: 'Belgique', countryFlag: '🇧🇪', region: 'Europe',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel est le célèbre aliment symbole de la Belgique ?',
    options: ['Les crêpes', 'Les gaufres', 'Les croissants', 'Les macarons'], answerIndex: 1,
    explanation: 'Les gaufres belges, moelleuses et sucrées, sont mondialement connues.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Suisse 🇨🇭
  // ══════════════════════════════════════════════════════
  { id: 8, type: 'ville', country: 'Suisse', countryFlag: '🇨🇭', region: 'Europe',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Combien de langues officielles y a-t-il en Suisse ?',
    options: ['2', '3', '4', '5'], answerIndex: 2,
    explanation: 'La Suisse a 4 langues officielles : allemand, français, italien et romanche.' },
  { id: 9, type: 'ville', country: 'Suisse', countryFlag: '🇨🇭', region: 'Europe',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel est le siège de la Croix-Rouge internationale ?',
    options: ['Zurich', 'Lausanne', 'Genève', 'Berne'], answerIndex: 2,
    explanation: 'Le Comité international de la Croix-Rouge (CICR) a son siège à Genève depuis 1863.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Sénégal 🇸🇳
  // ══════════════════════════════════════════════════════
  { id: 10, type: 'ville', country: 'Sénégal', countryFlag: '🇸🇳', region: 'Afrique',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle est la capitale du Sénégal ?',
    options: ['Abidjan', 'Bamako', 'Dakar', 'Ouagadougou'], answerIndex: 2,
    explanation: 'Dakar est la capitale et la plus grande ville du Sénégal, à la pointe ouest de l\'Afrique.' },
  { id: 11, type: 'ville', country: 'Sénégal', countryFlag: '🇸🇳', region: 'Afrique',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel est le plat national du Sénégal ?',
    options: ['Couscous', 'Thiéboudiène', 'Jollof rice', 'Mafé'], answerIndex: 1,
    explanation: 'Le Thiéboudiène (riz au poisson) est le plat national sénégalais, inscrit au patrimoine de l\'UNESCO.' },
  { id: 12, type: 'ville', country: 'Sénégal', countryFlag: '🇸🇳', region: 'Afrique',
    difficulty: 'avance', pointsValue: 200,
    question: 'Quel auteur sénégalais a écrit "Une si longue lettre" ?',
    options: ['Léopold Sédar Senghor', 'Mariama Bâ', 'Ousmane Sembène', 'Cheikh Hamidou Kane'], answerIndex: 1,
    explanation: '"Une si longue lettre" (1979) de Mariama Bâ est un chef-d\'œuvre de la littérature africaine.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Maroc 🇲🇦
  // ══════════════════════════════════════════════════════
  { id: 13, type: 'ville', country: 'Maroc', countryFlag: '🇲🇦', region: 'Afrique',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle est la capitale administrative du Maroc ?',
    options: ['Casablanca', 'Marrakech', 'Rabat', 'Fès'], answerIndex: 2,
    explanation: 'Rabat est la capitale du Maroc depuis 1912. Casablanca est la plus grande ville.' },
  { id: 14, type: 'ville', country: 'Maroc', countryFlag: '🇲🇦', region: 'Afrique',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle montagne traverse le Maroc ?',
    options: ['Les Alpes', 'Le Rif', 'L\'Atlas', 'Le Hoggar'], answerIndex: 2,
    explanation: 'La chaîne de l\'Atlas traverse le Maroc et culmine au Toubkal (4 167 m).' },

  // ══════════════════════════════════════════════════════
  // VILLE — Côte d'Ivoire 🇨🇮
  // ══════════════════════════════════════════════════════
  { id: 15, type: 'ville', country: "Côte d'Ivoire", countryFlag: '🇨🇮', region: 'Afrique',
    difficulty: 'debutant', pointsValue: 100,
    question: "Quelle est la plus grande ville de la Côte d'Ivoire ?",
    options: ['Yamoussoukro', 'Abidjan', 'Bouaké', 'San-Pédro'], answerIndex: 1,
    explanation: 'Abidjan est la capitale économique, mais Yamoussoukro est la capitale officielle.' },
  { id: 16, type: 'ville', country: "Côte d'Ivoire", countryFlag: '🇨🇮', region: 'Afrique',
    difficulty: 'intermediaire', pointsValue: 150,
    question: "Quel est le premier produit d'exportation de la Côte d'Ivoire ?",
    options: ['Café', 'Or', 'Cacao', 'Pétrole'], answerIndex: 2,
    explanation: "La Côte d'Ivoire est le premier producteur mondial de cacao, représentant 40% de la production mondiale." },

  // ══════════════════════════════════════════════════════
  // VILLE — Québec 🇨🇦
  // ══════════════════════════════════════════════════════
  { id: 17, type: 'ville', country: 'Québec', countryFlag: '🇨🇦', region: 'Amérique',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quel aliment sucré est célèbre au Québec ?',
    options: ['La poutine', 'Le sirop d\'érable', 'La tire Sainte-Catherine', 'Le sucre à la crème'], answerIndex: 1,
    explanation: 'Le Québec produit 70% du sirop d\'érable mondial !' },
  { id: 18, type: 'ville', country: 'Québec', countryFlag: '🇨🇦', region: 'Amérique',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel est le grand festival musical de Montréal ?',
    options: ['Festival de Jazz de Montréal', 'Osheaga', 'Festival des Francofolies', 'Coup de cœur francophone'], answerIndex: 0,
    explanation: 'Le Festival International de Jazz de Montréal est l\'un des plus grands au monde depuis 1980.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Haïti 🇭🇹
  // ══════════════════════════════════════════════════════
  { id: 19, type: 'ville', country: 'Haïti', countryFlag: '🇭🇹', region: 'Amérique',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Haïti est le premier pays des Amériques à avoir…',
    options: ['Rejoint l\'ONU', 'Eu l\'électricité', 'Aboli l\'esclavage', 'Créé internet'], answerIndex: 2,
    explanation: 'Haïti a proclamé son indépendance le 1er janvier 1804, abolissant l\'esclavage.' },
  { id: 20, type: 'ville', country: 'Haïti', countryFlag: '🇭🇹', region: 'Amérique',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quelle langue créole parle-t-on en Haïti en plus du français ?',
    options: ['Créole haïtien', 'Créole martiniquais', 'Créole réunionnais', 'Créole guadeloupéen'], answerIndex: 0,
    explanation: 'Le créole haïtien est co-langue officielle d\'Haïti avec le français depuis 1987.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Vietnam 🇻🇳
  // ══════════════════════════════════════════════════════
  { id: 21, type: 'ville', country: 'Vietnam', countryFlag: '🇻🇳', region: 'Asie',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle est la capitale du Vietnam ?',
    options: ['Hô Chi Minh-Ville', 'Da Nang', 'Hanoi', 'Hué'], answerIndex: 2,
    explanation: 'Hanoi est la capitale du Vietnam depuis 1010. Elle est surnommée "Thành phố Hà Nội".' },
  { id: 22, type: 'ville', country: 'Vietnam', countryFlag: '🇻🇳', region: 'Asie',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quelle merveille naturelle se trouve au Vietnam ?',
    options: ['Le Mékong Delta', 'La Baie d\'Ha Long', 'Le Mont Fansipan', 'Les rizières de Sapa'], answerIndex: 1,
    explanation: 'La Baie d\'Ha Long est inscrite au patrimoine mondial de l\'UNESCO depuis 1994.' },

  // ══════════════════════════════════════════════════════
  // VILLE — Liban 🇱🇧
  // ══════════════════════════════════════════════════════
  { id: 23, type: 'ville', country: 'Liban', countryFlag: '🇱🇧', region: 'Asie',
    difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle est la capitale du Liban ?',
    options: ['Tripoli', 'Sidon', 'Beyrouth', 'Tyr'], answerIndex: 2,
    explanation: 'Beyrouth est souvent appelée "Paris du Moyen-Orient" pour sa culture et son architecture.' },
  { id: 24, type: 'ville', country: 'Liban', countryFlag: '🇱🇧', region: 'Asie',
    difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel arbre figure sur le drapeau du Liban ?',
    options: ['Le palmier', 'L\'olivier', 'Le cèdre', 'Le pin'], answerIndex: 2,
    explanation: 'Le cèdre du Liban (Cedrus libani) est un symbole national millénaire.' },

  // ══════════════════════════════════════════════════════
  // LANGUE — Débutant
  // ══════════════════════════════════════════════════════
  { id: 30, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: 'Que signifie "Bonjour" ?',
    options: ['Goodbye', 'Hello / Good morning', 'Thank you', 'Please'], answerIndex: 1,
    explanation: '"Bonjour" est le salut le plus courant en français, utilisé le matin et l\'après-midi.' },
  { id: 31, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: 'Complète la phrase : "Je ___ étudiant."',
    options: ['es', 'êtes', 'suis', 'sommes'], answerIndex: 2,
    explanation: 'Le verbe "être" au présent : je SUIS, tu es, il est, nous sommes, vous êtes, ils sont.' },
  { id: 32, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: 'Comment dit-on "cat" en français ?',
    options: ['Chien', 'Lapin', 'Chat', 'Oiseau'], answerIndex: 2,
    explanation: '"Chat" (masculin) ou "chatte" (féminin) désigne le félin domestique.' },
  { id: 33, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: 'Quel nombre vient après "neuf" (9) ?',
    options: ['Huit', 'Dix', 'Onze', 'Sept'], answerIndex: 1,
    explanation: 'En français : huit (8), neuf (9), dix (10), onze (11).' },
  { id: 34, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: 'Que signifie "Au revoir" ?',
    options: ['Hello', 'Thank you', 'Goodbye', 'Please'], answerIndex: 2,
    explanation: '"Au revoir" signifie littéralement "à la prochaine vision" = Goodbye.' },
  { id: 35, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: 'Quelle couleur est "bleu" ?',
    options: ['Red', 'Green', 'Yellow', 'Blue'], answerIndex: 3,
    explanation: 'Les couleurs primaires en français : rouge (red), bleu (blue), jaune (yellow).' },
  { id: 36, type: 'langue', difficulty: 'debutant', pointsValue: 100,
    question: '"S\'il vous plaît" signifie…',
    options: ['Thank you', 'Excuse me', 'Please', 'You\'re welcome'], answerIndex: 2,
    explanation: '"S\'il vous plaît" (formel) ou "s\'il te plaît" (informel) = Please.' },

  // ══════════════════════════════════════════════════════
  // LANGUE — Intermédiaire
  // ══════════════════════════════════════════════════════
  { id: 40, type: 'langue', difficulty: 'intermediaire', pointsValue: 150,
    question: 'Conjuguez "parler" au présent — nous :',
    options: ['parlons', 'parlez', 'parlent', 'parlons-vous'], answerIndex: 0,
    explanation: 'Verbe en -ER au présent : je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.' },
  { id: 41, type: 'langue', difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel est le féminin de "beau" ?',
    options: ['beaute', 'belle', 'beaux', 'bel'], answerIndex: 1,
    explanation: 'Beau → Belle (féminin). Beau garçon → belle fille. Attention : "bel" s\'utilise devant voyelle.' },
  { id: 42, type: 'langue', difficulty: 'intermediaire', pointsValue: 150,
    question: '"Il fait beau" signifie…',
    options: ['He is beautiful', 'The weather is nice', 'He does well', 'It is beautiful here'], answerIndex: 1,
    explanation: '"Faire beau" = nice weather. Expressions météo : il fait beau, mauvais, froid, chaud.' },
  { id: 43, type: 'langue', difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel auxiliaire utilise-t-on avec "aller" au passé composé ?',
    options: ['Avoir', 'Être', 'Faire', 'Venir'], answerIndex: 1,
    explanation: '"Aller" se conjugue avec ÊTRE : je suis allé(e), tu es allé(e)...' },
  { id: 44, type: 'langue', difficulty: 'intermediaire', pointsValue: 150,
    question: 'Complète : "Nous ___ au cinéma hier soir."',
    options: ['avons allé', 'sommes allés', 'étions allé', 'allions'], answerIndex: 1,
    explanation: 'Passé composé avec être : Nous SOMMES ALLÉS (accord au pluriel masculin).' },
  { id: 45, type: 'langue', difficulty: 'intermediaire', pointsValue: 150,
    question: 'Quel est le contraire de "grand" ?',
    options: ['gros', 'court', 'petit', 'bas'], answerIndex: 2,
    explanation: 'Grand ↔ Petit. Attention : "court" est le contraire de "long".' },

  // ══════════════════════════════════════════════════════
  // LANGUE — Avancé
  // ══════════════════════════════════════════════════════
  { id: 50, type: 'langue', difficulty: 'avance', pointsValue: 200,
    question: 'Conjuguez au subjonctif présent : "Il faut que tu ___ (venir)."',
    options: ['viennes', 'viens', 'venies', 'sois venu'], answerIndex: 0,
    explanation: 'Subjonctif de "venir" : que je vienne, tu viennes, il vienne, nous venions...' },
  { id: 51, type: 'langue', difficulty: 'avance', pointsValue: 200,
    question: '"Joindre les deux bouts" signifie…',
    options: ['Faire de la couture', 'Avoir des difficultés financières', 'Relier deux chemins', 'Terminer un projet'], answerIndex: 1,
    explanation: 'Expression idiomatique : "joindre les deux bouts" = avoir juste assez d\'argent pour vivre.' },
  { id: 52, type: 'langue', difficulty: 'avance', pointsValue: 200,
    question: 'Quel accent porte le "e" dans le mot "crème" ?',
    options: ['Accent aigu (é)', 'Accent grave (è)', 'Accent circonflexe (ê)', 'Tréma (ë)'], answerIndex: 1,
    explanation: 'Crème porte un accent GRAVE. Comparer : été (aigu), fête (circonflexe), Noël (tréma).' },
  { id: 53, type: 'langue', difficulty: 'avance', pointsValue: 200,
    question: 'Quelle figure de style est : "La vie est un long fleuve tranquille" ?',
    options: ['Métaphore', 'Comparaison', 'Personnification', 'Hyperbole'], answerIndex: 0,
    explanation: 'C\'est une MÉTAPHORE (assimilation directe). Si on disait "comme un fleuve" = comparaison.' },
  { id: 54, type: 'langue', difficulty: 'avance', pointsValue: 200,
    question: 'Quel est le participe présent du verbe "savoir" ?',
    options: ['savant', 'su', 'sachant', 'saurait'], answerIndex: 2,
    explanation: 'Le participe présent de "savoir" est SACHANT (irrégulier). Ex: "sachant cela, il est parti".' },
];
