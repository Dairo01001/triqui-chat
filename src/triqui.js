class Triqui {
  constructor() {
    this.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    this.letter = "X";
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }

  swapLetter() {
    if (this.letter === "X") {
      return (this.letter = "O");
    }

    this.letter = "X";
  }

  makeMove(letter, index) {
    if (this.board[index] === " ") {
      this.board[index] = letter;
      return true;
    }
    return false;
  }

  clearBoard() {
    this.board = this.board.map(() => " ");
  }

  isWinning(letter) {
    for (let i = 0; i < this.winningCombinations.length; i++) {
      if (
        this.board[this.winningCombinations[i][0]] === letter &&
        this.board[this.winningCombinations[i][1]] === letter &&
        this.board[this.winningCombinations[i][2]] === letter
      ) {
        return true;
      }
    }
    return false;
  }

  isFullBoard() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === " ") {
        return false;
      }
    }
    return true;
  }
}

module.exports = Triqui;
