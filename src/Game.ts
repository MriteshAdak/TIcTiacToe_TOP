import { Player } from './Player.js';
import { CellIndex, WinCombo, GameResult, Player as PlayerSymbol } from './types.js';

export class Game {
  private static readonly WIN_COMBOS: readonly WinCombo[] = [
    [0, 3, 6], [0, 1, 2], [0, 4, 8],
    [2, 5, 8], [2, 4, 6], [6, 7, 8],
    [3, 4, 5], [1, 4, 7]
  ] as const;
  
  private static readonly BOARD_SIZE = 9;
  private static readonly MIN_MOVES_TO_WIN = 5;
  
  private board: Set<CellIndex> = new Set();
  private currentPlayer: Player;
  
  constructor(
    private readonly player1: Player,
    private readonly player2: Player
  ) {
    this.currentPlayer = player1;
  }
  
  makeMove(index: CellIndex): GameResult {
    if (this.board.has(index)) {
      throw new Error(`Cell ${index} already occupied`);
    }
    
    this.currentPlayer.addChoice(index);
    this.board.add(index);
    
    const result = this.checkGameEnd();
    
    if (!result) {
      this.switchPlayer();
    }
    
    return result;
  }
  
  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }
  
  getMoveCount(): number {
    return this.board.size;
  }
  
  reset(): void {
    this.board.clear();
    this.player1.clearChoices();
    this.player2.clearChoices();
    this.currentPlayer = this.player1;
  }
  
  private switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === this.player1 
      ? this.player2 
      : this.player1;
  }
  
  private checkGameEnd(): GameResult {
    // Can't win before 5 moves
    if (this.board.size < Game.MIN_MOVES_TO_WIN) {
      return null;
    }
    
    const winner = this.checkWinner();
    if (winner) return winner;
    
    // Draw if board full
    return this.board.size === Game.BOARD_SIZE ? 'draw' : null;
  }
  
  private checkWinner(): PlayerSymbol | null {
    for (const combo of Game.WIN_COMBOS) {
      if (this.currentPlayer.hasWinCombo(combo)) {
        return this.currentPlayer.symbol;
      }
    }
    return null;
  }
}