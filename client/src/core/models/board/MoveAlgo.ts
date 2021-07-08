import { square } from "@models/square";
import { Color } from "@type/Color";
import { SquareID } from "@type/SquareID";
import dangerOnKing from "./DangerOnKing";
import { Position } from "@type/Position";
import { color } from "@constants/color";
import rook from "@models/stone/rook";
import { isInRange } from "./isInRange";

enum squareState {
  outOfRange,
  empty,
  friend,
  opponent,
}

/**
 * if function return:
 * 1- means it is not inside the range
 * 2- it inside the range but the square is not empty
 * 3- the square where it will go is friend
 * 4- the square where it will go is opponent
 * return the state of the square
 */

//take board:board state,stoneColor:stone color, pos.i: y axis of stone , pos.j : x axis of stone.

function getSquareState(board: square[][], stoneColor: Color, dest: Position) {
  if (!isInRange(dest.i, dest.j)) return squareState.outOfRange;
  if (!board[dest.i][dest.j].stone) return squareState.empty;
  if (board[dest.i][dest.j].stone.color === stoneColor)
    return squareState.friend;
  return squareState.opponent;
}

//Note : there is better approch to make it less coupling but I thought this will be faster,
// instead of passing the val we could return array and then adding the returned value to the array which may take more operation

export function addToValArray(
  board: square[][],
  src: Position,
  dest: Position,
  stoneColor: Color,
  val: SquareID[]
) {
  const currentState = getSquareState(board, stoneColor, dest);
  if (
    currentState === squareState.outOfRange ||
    currentState === squareState.friend ||
    dangerOnKing(board, src, dest)
  )
    return false;
  val.push(board[dest.i][dest.j].id);
  if (currentState === squareState.opponent) return false;
  return true;
}

export function addVertical(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  for (let k = src.i + 1; k < 8; k++) {
    const dest = { i: k, j: src.j };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }

  for (let k = src.i - 1; k >= 0; k--) {
    const dest = { i: k, j: src.j };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }
}

export function addHorizontal(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  for (let k = src.j + 1; k < 8; k++) {
    const dest = { i: k, j: src.j };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }

  for (let k = src.j - 1; k >= 0; k--) {
    const dest = { i: k, j: src.j };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }
}

export function addDiagonal(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  for (let a = src.i + 1, b = src.j + 1; a < 8 && b < 8; a++, b++) {
    const dest = { i: a, j: b };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }
  for (let a = src.i - 1, b = src.j - 1; a >= 0 && b >= 0; a--, b--) {
    const dest = { i: a, j: b };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }
}

export function addAntiDiagonal(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  for (let a = src.i - 1, b = src.j + 1; a >= 0 && b < 8; a--, b++) {
    const dest = { i: a, j: b };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }
  for (let a = src.i + 1, b = src.j - 1; a < 8 && b >= 0; a++, b--) {
    const dest = { i: a, j: b };
    if (!addToValArray(board, src, dest, stoneColor, val)) break;
  }
}

export function kingMove(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  //special case for king
  //TODO : allow it if the king in the first move
  if (
    (stoneColor === color.white && src.i === 7 && src.j === 4) ||
    (stoneColor === color.black && src.i === 7 && src.j === 3)
  ) {
    let control = true;
    //right flip
    if (
      getSquareState(board, stoneColor, 7, 7) === squareState.friend &&
      board[7][7].stone instanceof rook
    ) {
      for (let k = src.j + 1; k < 6; k++)
        if (board[src.i][k].stone) {
          control = false;
          break;
        }

      if (control && !dangerOnKing(board, src.i, src.j, src.i, 6))
        val.push(board[src.i][6].id);
    }

    //left flip
    control = true;
    if (
      getSquareState(board, stoneColor, 7, 0) === 3 &&
      board[7][0].stone instanceof rook
    ) {
      for (let k = src.j - 1; k >= 1; k--)
        if (board[src.i][k].stone) {
          control = false;
          break;
        }
      if (control && !dangerOnKing(board, src.i, src.j, src.i, 1))
        val.push(board[src.i][1].id);
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
      !addToValArray(
        board,
        src,
        { i: src.i + iOffset, j: src.j + jOffset },
        stoneColor,
        val
      )
    )
      return;

    val.push(board[src.i + iOffset][src.j + jOffset].id);
  });
}

export function knightMove(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
  ].forEach((e) => {
    //it is not just for pos it is 8 but we could reverse pos.i and pos.j to get the other one
    const [iOffset, jOffset] = e;
    addToValArray(
      board,
      src,
      { i: src.i + iOffset, j: src.j + jOffset },
      stoneColor,
      val
    );
    addToValArray(
      board,
      src,
      { i: src.i + jOffset, j: src.j + iOffset },
      stoneColor,
      val
    );
  });
  return val;
}

export function pawnMove(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  //check if stone could eat the opponent in the upper right
  addToValArray(board, src, { i: src.i - 1, j: src.j - 1 }, stoneColor, val);
  //if stone could eat the opponent in the upper left
  addToValArray(board, src, { i: src.i - 1, j: src.j + 1 }, stoneColor, val);
  //two jump of one jump for pawn

  if (addToValArray(board, src, { i: src.i - 1, j: src.j }, stoneColor, val)) {
    addToValArray(board, src, { i: src.i - 2, j: src.j }, stoneColor, val);
  }
}
