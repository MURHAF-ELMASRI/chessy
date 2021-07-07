import { MoveRules } from "@models/stone/MoveRules";
import { Color } from "@type/Color";
import { Position } from "@type/Position";
import { SquareID } from "@type/SquareID";
import initializeBord from "./initializeBord";
import {
  addAntiDiagonal,
  addDiagonal,
  addHorizontal,
  addVertical,
  kingMove,
  pawnMove,
} from "./MoveAlgo";
enum squareState {
  outOfRange,
  empty,
  friend,
  opponent,
}

function hasFlag(x: MoveRules, flag: MoveRules) {
  return x & flag;
}

class bord {
  readonly board;
  public playerKingPosition: Position = { i: 7, j: 4 };
  readonly playerColor: Color;
  constructor(color: Color) {
    this.playerColor = color;
    //TODO: change the bord based on player color
    this.board = initializeBord();
  }

  getAvailableSquare(src: Position) {
    const stone = this.board[src.i][src.j].stone;
    const val: SquareID[] = [];
    if (!stone) return [];
    if (hasFlag(stone.move, MoveRules.vertical))
      addVertical(this.board, stone.color, val, src);
    if (hasFlag(stone.move, MoveRules.horizontal))
      addHorizontal(this.board, stone.color, val, src);
    if (hasFlag(stone.move, MoveRules.diagonal))
      addDiagonal(this.board, stone.color, val, src);
    if (hasFlag(stone.move, MoveRules.antiDiagonal))
      addAntiDiagonal(this.board, stone.color, val, src);
    if (hasFlag(stone.move, MoveRules.king))
      kingMove(this.board, stone.color, val, src);
    if (hasFlag(stone.move, MoveRules.knight))
      kingMove(this.board, stone.color, val, src);
    if (hasFlag(stone.move, MoveRules.pawn))
      pawnMove(this.board, stone.color, val, src);

    return val;
  }
}

export default bord;
