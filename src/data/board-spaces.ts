import { BoardSpace } from '../types';

/**
 * 32-space board on a 9×9 grid, travelling clockwise:
 * START (9,9) → Right col up → Go-to-Jail (9,1) → Top row left → Free Parking (1,1)
 * → Left col down → Jail (1,9) → Bottom row right → back to START
 *
 * Regions:
 *  Right col   (spaces  1-7):  Asie
 *  Top row     (spaces  9-15): Amérique
 *  Left col    (spaces 17-23): Afrique
 *  Bottom row  (spaces 25-31): Europe
 */
export const BOARD_SPACES: BoardSpace[] = [
  // ── Corner: START ────────────────────────────────────────────────────────
  { id: 0,  name: 'DÉPART',          type: 'start',       col: 9, row: 9,
    description: 'Passez ici et gagnez +50 Points Culturels !' },

  // ── Right column — ASIE ─────────────────────────────────────────────────
  { id: 1,  name: 'Hanoi',           type: 'ville',       col: 9, row: 8,
    region: 'Asie', country: 'Vietnam',    countryFlag: '🇻🇳',
    colorClass: 'bg-emerald-500', description: 'Capitale du Vietnam.' },

  { id: 2,  name: 'Langue — Asie',   type: 'langue',      col: 9, row: 7,
    region: 'Asie', colorClass: 'bg-emerald-500',
    description: 'Question de langue française !' },

  { id: 3,  name: 'Hô Chi Minh',     type: 'ville',       col: 9, row: 6,
    region: 'Asie', country: 'Vietnam',    countryFlag: '🇻🇳',
    colorClass: 'bg-emerald-500', description: 'Métropole économique du Vietnam.' },

  { id: 4,  name: 'Aéroport',        type: 'aeroport',    col: 9, row: 5,
    description: 'Voyagez directement vers n\'importe quelle Alliance Française !' },

  { id: 5,  name: 'Beyrouth',        type: 'ville',       col: 9, row: 4,
    region: 'Asie', country: 'Liban',      countryFlag: '🇱🇧',
    colorClass: 'bg-emerald-500', description: 'Capitale culturelle du Liban.' },

  { id: 6,  name: 'Langue — Liban',  type: 'langue',      col: 9, row: 3,
    region: 'Asie', colorClass: 'bg-emerald-500',
    description: 'Question de langue française !' },

  { id: 7,  name: 'Festival Asie',   type: 'festival',    col: 9, row: 2,
    region: 'Asie', description: 'Mini-jeu culturel ! Gagnez des points bonus.' },

  // ── Corner: Go to Jail ───────────────────────────────────────────────────
  { id: 8,  name: 'Allez en Prison', type: 'go-to-jail',  col: 9, row: 1 },

  // ── Top row — AMÉRIQUE ───────────────────────────────────────────────────
  { id: 9,  name: 'Montréal',        type: 'ville',       col: 8, row: 1,
    region: 'Amérique', country: 'Québec', countryFlag: '🇨🇦',
    colorClass: 'bg-red-500', description: 'Métropole francophone du Canada.' },

  { id: 10, name: 'Langue — Québec', type: 'langue',      col: 7, row: 1,
    region: 'Amérique', colorClass: 'bg-red-500',
    description: 'Question de langue française !' },

  { id: 11, name: 'Carte Chance',    type: 'carte-chance', col: 6, row: 1,
    description: 'Tirez une Carte Chance — bonne ou mauvaise surprise !' },

  { id: 12, name: 'Port-au-Prince',  type: 'ville',       col: 5, row: 1,
    region: 'Amérique', country: 'Haïti', countryFlag: '🇭🇹',
    colorClass: 'bg-red-500', description: 'Capitale d\'Haïti.' },

  { id: 13, name: 'Langue — Haïti',  type: 'langue',      col: 4, row: 1,
    region: 'Amérique', colorClass: 'bg-red-500',
    description: 'Question de langue française !' },

  { id: 14, name: 'Alliance Française', type: 'alliance', col: 3, row: 1,
    description: 'Récupérez +75 Points Culturels grâce à l\'Alliance Française !' },

  { id: 15, name: 'FINALE',          type: 'finale',      col: 2, row: 1,
    description: 'Défi final ! Répondez pour décrocher le titre de Maître !' },

  // ── Corner: Free Parking ─────────────────────────────────────────────────
  { id: 16, name: 'Parc Gratuit',    type: 'free-parking', col: 1, row: 1 },

  // ── Left column — AFRIQUE ────────────────────────────────────────────────
  { id: 17, name: 'Dakar',           type: 'ville',       col: 1, row: 2,
    region: 'Afrique', country: 'Sénégal',      countryFlag: '🇸🇳',
    colorClass: 'bg-amber-500', description: 'Capitale du Sénégal.' },

  { id: 18, name: 'Langue — Sénégal', type: 'langue',     col: 1, row: 3,
    region: 'Afrique', colorClass: 'bg-amber-500',
    description: 'Question de langue française !' },

  { id: 19, name: 'Carte Culture',   type: 'carte-culture', col: 1, row: 4,
    description: 'Retournez une Carte Culture et testez vos connaissances !' },

  { id: 20, name: 'Rabat',           type: 'ville',       col: 1, row: 5,
    region: 'Afrique', country: 'Maroc',        countryFlag: '🇲🇦',
    colorClass: 'bg-amber-500', description: 'Capitale administrative du Maroc.' },

  { id: 21, name: 'Langue — Maroc',  type: 'langue',      col: 1, row: 6,
    region: 'Afrique', colorClass: 'bg-amber-500',
    description: 'Question de langue française !' },

  { id: 22, name: 'Abidjan',         type: 'ville',       col: 1, row: 7,
    region: 'Afrique', country: "Côte d'Ivoire", countryFlag: '🇨🇮',
    colorClass: 'bg-amber-500', description: "Capitale économique de la Côte d'Ivoire." },

  { id: 23, name: 'Festival Afrique', type: 'festival',   col: 1, row: 8,
    region: 'Afrique', description: 'Mini-jeu culturel Afrique !' },

  // ── Corner: Jail ─────────────────────────────────────────────────────────
  { id: 24, name: 'Prison',          type: 'jail',        col: 1, row: 9 },

  // ── Bottom row — EUROPE ──────────────────────────────────────────────────
  { id: 25, name: 'Bruxelles',       type: 'ville',       col: 2, row: 9,
    region: 'Europe', country: 'Belgique',  countryFlag: '🇧🇪',
    colorClass: 'bg-blue-500', description: 'Capitale de la Belgique et de l\'UE.' },

  { id: 26, name: 'Langue — Belgique', type: 'langue',    col: 3, row: 9,
    region: 'Europe', colorClass: 'bg-blue-500',
    description: 'Question de langue française !' },

  { id: 27, name: 'Festival Europe', type: 'festival',    col: 4, row: 9,
    region: 'Europe', description: 'Mini-jeu culturel Europe !' },

  { id: 28, name: 'Genève',          type: 'ville',       col: 5, row: 9,
    region: 'Europe', country: 'Suisse',    countryFlag: '🇨🇭',
    colorClass: 'bg-blue-500', description: 'Ville internationale de la diplomatie.' },

  { id: 29, name: 'Langue — Suisse', type: 'langue',      col: 6, row: 9,
    region: 'Europe', colorClass: 'bg-blue-500',
    description: 'Question de langue française !' },

  { id: 30, name: 'Paris',           type: 'ville',       col: 7, row: 9,
    region: 'Europe', country: 'France',    countryFlag: '🇫🇷',
    colorClass: 'bg-blue-500', description: 'La Ville Lumière, capitale de la France.' },

  { id: 31, name: 'Langue — France', type: 'langue',      col: 8, row: 9,
    region: 'Europe', colorClass: 'bg-blue-500',
    description: 'Question de langue française !' },
];
