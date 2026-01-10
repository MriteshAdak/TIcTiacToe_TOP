// Core game types and enums

// Enum prevents typos and provides autocomplete
export enum Player {
  X = 'X',
  O = 'O'
}

// Type alias for cell indices (0-8)
export type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// Win condition type - array of exactly 3 cell indices
export type WinCombo = readonly [CellIndex, CellIndex, CellIndex];

// Union type for game outcomes
export type GameResult = Player | 'draw' | null;

// Player info structure
export interface PlayerInfo {
  name: string;
  symbol: Player;
  imagePath: string;
}