// Class replaces factory function - cleaner syntax in TS
export class Player {
    constructor(symbol, name) {
        this.symbol = symbol;
        this.name = name;
        this.choices = new Set();
    }
    addChoice(index) {
        this.choices.add(index);
    }
    getChoices() {
        return this.choices;
    }
    hasChoice(index) {
        return this.choices.has(index);
    }
    clearChoices() {
        this.choices.clear();
    }
    // Check if player has winning combo
    hasWinCombo(combo) {
        return combo.every(index => this.choices.has(index));
    }
}
