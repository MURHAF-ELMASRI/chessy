import { color } from "src/constants/color";
import { MoveRules } from "src/core/models/stone/MoveRules";
import { Color } from "src/types/Color";
import { Position } from "src/types/Position";
import { SquareID } from "src/types/SquareID";
import { square } from "../square";
import dangerOnKing from "./DangerOnKing";
import { initializeBord } from "./initializeBord";
import { isInRange } from "./isInRange";

enum squareState {
  outOfRange,
  empty,
  friend,
  opponent,
}

function hasFlag(x: MoveRules, flag: MoveRules) {
  return x & flag;
}

class boardClass {
  readonly board;
  public playerKingPosition: Position;
  readonly playerColor: Color;
  constructor(playerColor: Color) {
    this.playerColor = playerColor;
    if (playerColor === color.white) this.playerKingPosition = { i: 7, j: 4 };
    else this.playerKingPosition = { i: 7, j: 3 };
    this.board = initializeBord(playerColor);
  }

  moveStone(src: Position, dest: Position) {
    const stone = this.board[src.i][src.j].stone;
    if (stone?.type === "king" && stone.color === this.playerColor)
      this.playerKingPosition = { i: dest.i, j: dest.j };
    this.board[dest.i][dest.j].stone = this.board[src.i][src.j].stone;
    delete this.board[src.i][src.j].stone;
  }

  getWhereStoneCanGo() {
    //initalizing stone position
    const initPos: { [key: number]: SquareID[] } = {};
    //TODO: optimize this function by set two ; one for looping over array from 1 to 16 if player game is black and the rest for white color
    this.board.forEach((e, i) =>
      e.forEach((x, j) => {
        if (x.stone && x.stone.color === this.playerColor) {
          initPos[x.stone.id] = this.getAvailableSquare({ i, j });
        }
      })
    );
    return initPos;
  }

  getAvailableSquare(src: Position) {
    const stone = this.board[src.i][src.j].stone;
    const val: SquareID[] = [];
    if (!stone) return [];
    if (hasFlag(stone.move, MoveRules.vertical)) this.addVertical(val, src);
    if (hasFlag(stone.move, MoveRules.horizontal)) this.addHorizontal(val, src);
    if (hasFlag(stone.move, MoveRules.diagonal)) this.addDiagonal(val, src);
    if (hasFlag(stone.move, MoveRules.antiDiagonal))
      this.addAntiDiagonal(val, src);
    if (hasFlag(stone.move, MoveRules.king)) this.kingMove(val, src);
    if (hasFlag(stone.move, MoveRules.knight)) this.knightMove(val, src);
    if (hasFlag(stone.move, MoveRules.pawn)) this.pawnMove(val, src);

    return val;
  }

  getSquareState(dest: Position) {
    if (!isInRange(dest.i, dest.j)) return squareState.outOfRange;
    const board = this.board[dest.i][dest.j];
    if (!board.stone) return squareState.empty;
    if (board.stone.color === this.playerColor) return squareState.friend;
    return squareState.opponent;
  }

  addToValArray(src: Position, dest: Position, val: SquareID[]) {
    const currentState = this.getSquareState(dest);
    if (
      currentState === squareState.outOfRange ||
      currentState === squareState.friend ||
      dangerOnKing(this.board, src, dest, this.playerKingPosition)
    )
      return false;
    val.push(this.board[dest.i][dest.j].id);
    if (currentState === squareState.opponent) return false;
    return true;
  }

  addVertical(val: SquareID[], src: Position) {
    for (let k = src.i + 1; k < 8; k++) {
      const dest = { i: k, j: src.j };
      if (!this.addToValArray(src, dest, val)) break;
    }

    for (let k = src.i - 1; k >= 0; k--) {
      const dest = { i: k, j: src.j };
      if (!this.addToValArray(src, dest, val)) break;
    }
  }
  addHorizontal(val: SquareID[], src: Position) {
    for (let k = src.j + 1; k < 8; k++) {
      const dest = { i: src.i, j: k };
      if (!this.addToValArray(src, dest, val)) break;
    }

    for (let k = src.j - 1; k >= 0; k--) {
      const dest = { i: src.i, j: k };
      if (!this.addToValArray(src, dest, val)) break;
    }
  }

  addDiagonal(val: SquareID[], src: Position) {
    for (let a = src.i + 1, b = src.j + 1; a < 8 && b < 8; a++, b++) {
      const dest = { i: a, j: b };
      if (!this.addToValArray(src, dest, val)) break;
    }
    for (let a = src.i - 1, b = src.j - 1; a >= 0 && b >= 0; a--, b--) {
      const dest = { i: a, j: b };
      if (!this.addToValArray(src, dest, val)) break;
    }
  }

  addAntiDiagonal(val: SquareID[], src: Position) {
    for (let a = src.i - 1, b = src.j + 1; a >= 0 && b < 8; a--, b++) {
      const dest = { i: a, j: b };
      if (!this.addToValArray(src, dest, val)) break;
    }
    for (let a = src.i + 1, b = src.j - 1; a < 8 && b >= 0; a++, b--) {
      const dest = { i: a, j: b };
      if (!this.addToValArray(src, dest, val)) break;
    }
  }
  kingMove(val: SquareID[], src: Position) {
    //special case for king
    //TODO : allow it if the king in the first move
    if (
      (this.playerColor === color.white && src.i === 7 && src.j === 4) ||
      (this.playerColor === color.black && src.i === 7 && src.j === 3)
    ) {
      let control = true;
      //right flip
      if (
        this.getSquareState({ i: 7, j: 7 }) === squareState.friend &&
        this.board[7][7].stone?.type === "rook"
      ) {
        for (let k = src.j + 1; k < 6; k++)
          if (this.board[src.i][k].stone) {
            control = false;
            break;
          }

        if (
          control &&
          !dangerOnKing(
            this.board,
            src,
            { i: src.i, j: 6 },
            this.playerKingPosition
          )
        )
          val.push(this.board[src.i][6].id);
      }

      //left flip
      control = true;
      if (
        this.getSquareState({ i: 7, j: 0 }) === 3 &&
        this.board[7][0].stone?.type === "rook"
      ) {
        for (let k = src.j - 1; k >= 1; k--)
          if (this.board[src.i][k].stone) {
            control = false;
            break;
          }
        if (
          control &&
          !dangerOnKing(
            this.board,
            src,
            { i: src.i, j: 1 },
            this.playerKingPosition
          )
        )
          val.push(this.board[src.i][1].id);
      }
    }

    [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ].forEach((e) => {
      const [iOffset, jOffset] = e;
      if (
        !this.addToValArray(
          src,
          { i: src.i + iOffset, j: src.j + jOffset },
          val
        )
      )
        return;

      val.push(this.board[src.i + iOffset][src.j + jOffset].id);
    });
  }
  knightMove(val: SquareID[], src: Position) {
    [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
    ].forEach((e) => {
      //it is not just for pos it is 8 but we could reverse pos.i and pos.j to get the other one
      const [iOffset, jOffset] = e;
      this.addToValArray(src, { i: src.i + iOffset, j: src.j + jOffset }, val);
      this.addToValArray(src, { i: src.i + jOffset, j: src.j + iOffset }, val);
    });
    return val;
  }

  pawnMove(val: SquareID[], src: Position) {
    //check if stone could eat the opponent in the upper right
    let currentState = this.getSquareState({ i: src.i - 1, j: src.j - 1 });
    if (currentState === squareState.opponent)
      this.addToValArray(src, { i: src.i - 1, j: src.j - 1 }, val);

    //if stone could eat the opponent in the upper left

    currentState = this.getSquareState({ i: src.i - 1, j: src.j + 1 });
    if (currentState === squareState.opponent)
      this.addToValArray(src, { i: src.i - 1, j: src.j + 1 }, val);
    //two jump of one jump for pawn

    currentState = this.getSquareState({ i: src.i - 1, j: src.j });
    if (currentState === squareState.empty) {
      currentState = this.getSquareState({ i: src.i - 2, j: src.j });
      if (currentState === squareState.empty && src.i === 6)
        this.addToValArray(src, { i: src.i - 2, j: src.j }, val);
      this.addToValArray(src, { i: src.i - 1, j: src.j }, val);
    }
  }
}

export default boardClass;
