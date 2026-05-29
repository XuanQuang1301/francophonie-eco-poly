/**
 * Types & Interfaces for Francophonie Board Game
 */

export type GameScreen = 'main-menu' | 'setup' | 'board' | 'world-map' | 'result';
export type Niveau = 'debutant' | 'intermediaire' | 'avance';
export type Region = 'Europe' | 'Afrique' | 'Amérique' | 'Asie';

export type SpaceType =
  | 'start'
  | 'ville'          // Cultural question → passport stamp
  | 'langue'         // French language question
  | 'carte-culture'  // Trivia card flip
  | 'carte-chance'   // Bonus or trap
  | 'aeroport'       // Teleport to any Alliance Française
  | 'festival'       // Mini-game (Escape Quiz / Match Flag / Clicker)
  | 'alliance'       // Alliance Française → recover points
  | 'finale'         // Boss challenge
  | 'free-parking'
  | 'jail'
  | 'go-to-jail';

export interface BoardSpace {
  id: number;
  name: string;
  type: SpaceType;
  region?: Region;
  country?: string;
  countryFlag?: string;
  colorClass?: string;   // Tailwind bg class for color band
  col: number;           // Grid column (1-9)
  row: number;           // Grid row (1-9)
  description?: string;
  icon?: string;
}

export interface PassportStamp {
  country: string;
  countryFlag: string;
  region: Region;
  earnedAt: string;
}

export interface Player {
  id: number;
  name: string;
  color: string;       // hex
  bgClass: string;
  borderClass: string;
  avatar: string;      // emoji
  culturalPoints: number;
  position: number;
  isJailed: boolean;
  jailTurns: number;
  passportStamps: PassportStamp[];
  streakCount: number;
  niveau: Niveau;
  isBot: boolean;
  isSkippingTurn: boolean;
}

export interface QuizQuestion {
  id: number;
  type: 'ville' | 'langue' | 'culture';
  question: string;
  options: string[];
  answerIndex: number;
  country?: string;
  countryFlag?: string;
  region?: Region;
  difficulty: Niveau;
  pointsValue: number;
  explanation?: string;
}

export interface CarteChance {
  id: number;
  title: string;
  description: string;
  pointsChange: number;
  icon: string;
  effect?: 'skip-turn' | 'extra-turn' | null;
}

export interface CarteCulture {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  fact: string;
  country: string;
  countryFlag: string;
  pointsValue: number;
}

export interface TransactionLog {
  id: string;
  timestamp: string;
  playerName: string;
  playerAvatar: string;
  message: string;
  type: 'info' | 'quiz' | 'stamp' | 'jail' | 'depart' | 'minigame' | 'carte';
}
