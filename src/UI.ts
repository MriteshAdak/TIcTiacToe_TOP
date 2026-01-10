import { Game } from './Game.js';
import { Player } from './Player.js';
import { CellIndex, GameResult, PlayerInfo } from './types.js';

export class UI {
  private readonly cells: HTMLButtonElement[];
  private readonly dialog: HTMLDialogElement;
  private readonly winnerImage: HTMLImageElement;
  private readonly declareText: HTMLHeadingElement;
  
  constructor(
    private readonly game: Game,
    private readonly playerInfoMap: Map<Player, PlayerInfo>
  ) {
    // Type assertion with runtime check
    this.cells = this.getCells();
    this.dialog = this.getElement<HTMLDialogElement>('dialog');
    this.winnerImage = this.getElement<HTMLImageElement>('#winner');
    this.declareText = this.getElement<HTMLHeadingElement>('#declare');
    
    this.attachEventListeners();
  }
  
  private getCells(): HTMLButtonElement[] {
    const cells: HTMLButtonElement[] = [];
    for (let i = 0; i < 9; i++) {
      const cell = this.getElement<HTMLButtonElement>("#"+CSS.escape(i.toString()));
      cells.push(cell);
    }
    return cells;
  }
  
  // Generic helper with type safety
  private getElement<T extends HTMLElement>(selector: string): T {
    const element = document.querySelector<T>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }
  
  private attachEventListeners(): void {
    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
        this.handleCellClick(index as CellIndex);
      });
    });
    
    const playAgainBtn = this.getElement<HTMLButtonElement>('#playAgain');
    playAgainBtn.addEventListener('click', () => this.resetGame());
  }
  
  private handleCellClick(index: CellIndex): void {
    try {
      const currentPlayer = this.game.getCurrentPlayer();
      const result = this.game.makeMove(index);
      
      this.updateCell(index, currentPlayer);
      
      if (result) {
        this.showEndScreen(result);
      }
    } catch (error) {
      // Cell already occupied, ignore
      console.warn(error);
    }
  }
  
  private updateCell(index: CellIndex, player: Player): void {
    const cell = this.cells[index];
    const info = this.playerInfoMap.get(player)!;
    
    cell.disabled = true;
    cell.style.backgroundImage = `url("${info.imagePath}")`;
    cell.style.backgroundSize = '200px';
  }
  
  private showEndScreen(result: GameResult): void {
    if (result === 'draw') {
      this.winnerImage.hidden = true;
      this.declareText.textContent = 
        "It's a TIE!! and the tie breaker is the WC count so the GOAT wins obviously. hehe!";
    } else {
      const winner = result === 'X' 
        ? this.playerInfoMap.get(this.game.getCurrentPlayer())!
        : this.playerInfoMap.get(this.game.getCurrentPlayer())!;
      
      this.winnerImage.hidden = false;
      this.winnerImage.src = winner.imagePath;
      
      this.declareText.textContent = result === 'X'
        ? "The G.O.A.T\nLEEOOO MESSSSIIII!!!"
        : "Good job!\nif only he did this good in WCs. :o";
    }
    
    this.dialog.showModal();
  }
  
  private resetGame(): void {
    this.dialog.close();
    this.game.reset();
    
    this.cells.forEach(cell => {
      cell.disabled = false;
      cell.style.backgroundImage = '';
    });
  }
}