export class UI {
    constructor(game, playerInfoMap) {
        this.game = game;
        this.playerInfoMap = playerInfoMap;
        // Type assertion with runtime check
        this.cells = this.getCells();
        this.dialog = this.getElement('dialog');
        this.winnerImage = this.getElement('#winner');
        this.declareText = this.getElement('#declare');
        this.attachEventListeners();
    }
    getCells() {
        const cells = [];
        for (let i = 0; i < 9; i++) {
            const cell = this.getElement("#" + CSS.escape(i.toString()));
            cells.push(cell);
        }
        return cells;
    }
    // Generic helper with type safety
    getElement(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`Element not found: ${selector}`);
        }
        return element;
    }
    attachEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                this.handleCellClick(index);
            });
        });
        const playAgainBtn = this.getElement('#playAgain');
        playAgainBtn.addEventListener('click', () => this.resetGame());
    }
    handleCellClick(index) {
        try {
            const currentPlayer = this.game.getCurrentPlayer();
            const result = this.game.makeMove(index);
            this.updateCell(index, currentPlayer);
            if (result) {
                this.showEndScreen(result);
            }
        }
        catch (error) {
            // Cell already occupied, ignore
            console.warn(error);
        }
    }
    updateCell(index, player) {
        const cell = this.cells[index];
        const info = this.playerInfoMap.get(player);
        cell.disabled = true;
        cell.style.backgroundImage = `url("${info.imagePath}")`;
        cell.style.backgroundSize = '200px';
    }
    showEndScreen(result) {
        if (result === 'draw') {
            this.winnerImage.hidden = true;
            this.declareText.textContent =
                "It's a TIE!! and the tie breaker is the WC count so the GOAT wins obviously. hehe!";
        }
        else {
            const winner = result === 'X'
                ? this.playerInfoMap.get(this.game.getCurrentPlayer())
                : this.playerInfoMap.get(this.game.getCurrentPlayer());
            this.winnerImage.hidden = false;
            this.winnerImage.src = winner.imagePath;
            this.declareText.textContent = result === 'X'
                ? "The G.O.A.T\nLEEOOO MESSSSIIII!!!"
                : "Good job!\nif only he did this good in WCs. :o";
        }
        this.dialog.showModal();
    }
    resetGame() {
        this.dialog.close();
        this.game.reset();
        this.cells.forEach(cell => {
            cell.disabled = false;
            cell.style.backgroundImage = '';
        });
    }
}
