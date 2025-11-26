
export enum GameStage {
  MENU = 'MENU',
  REVEAL = 'REVEAL',
  GAMEPLAY = 'GAMEPLAY',
  VOTING = 'VOTING',
  RESULTS = 'RESULTS'
}

export enum CategoryId {
  EASY = 'EASY',
  HARD = 'HARD',
  FUNNY = 'FUNNY',
  KIDS = 'KIDS',
  ADULT = 'ADULT',
  AI_GEN = 'AI_GEN'
}

export interface WordItem {
  word: string;
  hint: string;
}

export interface Player {
  id: number;
  isImposter: boolean;
  name: string;
  voteCount: number;
  isAlive: boolean;
}

export interface GameState {
  stage: GameStage;
  players: Player[];
  currentWord: string;
  currentWordHint: string;
  currentCategory: CategoryId;
  imposterIndex: number;
  activePlayerRevealIndex: number;
  timerSeconds: number;
  winningTeam: 'imposter' | 'citizens' | null;
  customCategoryPrompt?: string; // For AI generation
}

export interface Category {
  id: CategoryId;
  label: string; // Georgian label
  color: string;
  icon: string;
  words: WordItem[];
}

// --- New Types for Multi-Game Support ---

export enum GameType {
  IMPOSTER = 'IMPOSTER',
  LIAR = 'LIAR'
}

export interface LiarQuestionPair {
  id: string;
  truthQuestion: string;
  liarQuestion: string;
  category: string;
}

export interface LiarPlayer {
  id: number;
  name: string;
  isLiar: boolean;
  answer: string;
}

export interface LiarGameState {
  stage: 'MENU' | 'INPUT_TRANSITION' | 'INPUT' | 'BOARD' | 'REVEAL';
  players: LiarPlayer[];
  currentQuestion: LiarQuestionPair | null;
  activePlayerIndex: number;
}
