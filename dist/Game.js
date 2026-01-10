export class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Set();
        this.currentPlayer = player1;
    }
    makeMove(index) {
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
    getCurrentPlayer() {
        return this.currentPlayer;
    }
    getMoveCount() {
        return this.board.size;
    }
    reset() {
        this.board.clear();
        this.player1.clearChoices();
        this.player2.clearChoices();
        this.currentPlayer = this.player1;
    }
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1
            ? this.player2
            : this.player1;
    }
    checkGameEnd() {
        // Can't win before 5 moves
        if (this.board.size < Game.MIN_MOVES_TO_WIN) {
            return null;
        }
        const winner = this.checkWinner();
        if (winner)
            return winner;
        // Draw if board full
        return this.board.size === Game.BOARD_SIZE ? 'draw' : null;
    }
    checkWinner() {
        for (const combo of Game.WIN_COMBOS) {
            if (this.currentPlayer.hasWinCombo(combo)) {
                return this.currentPlayer.symbol;
            }
        }
        return null;
    }
}
Game.WIN_COMBOS = [
    [0, 3, 6], [0, 1, 2], [0, 4, 8],
    [2, 5, 8], [2, 4, 6], [6, 7, 8],
    [3, 4, 5], [1, 4, 7]
];
Game.BOARD_SIZE = 9;
Game.MIN_MOVES_TO_WIN = 5;
