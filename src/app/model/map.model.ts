export class Map {
  private boardLength!: string[][];

  constructor(boardLength: string[][]) {
    this.boardLength = boardLength;
  }

  get lengthBoard() {
    return this.boardLength;
  }
}
