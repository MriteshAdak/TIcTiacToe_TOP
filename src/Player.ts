import { CellIndex, Player as PlayerSymbol } from './types.js';

// Class replaces factory function - cleaner syntax in TS
export class Player {
  private choices: Set<CellIndex> = new Set();
  
  constructor(
    public readonly symbol: PlayerSymbol,
    public readonly name: string
  ) {}
  
  addChoice(index: CellIndex): void {
    this.choices.add(index);
  }
  
  getChoices(): ReadonlySet<CellIndex> {
    return this.choices;
  }
  
  hasChoice(index: CellIndex): boolean {
    return this.choices.has(index);
  }
  
  clearChoices(): void {
    this.choices.clear();
  }
  
  // Check if player has winning combo
  hasWinCombo(combo: readonly CellIndex[]): boolean {
    return combo.every(index => this.choices.has(index));
  }
}