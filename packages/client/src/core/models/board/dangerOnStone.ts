//utility function return the position of stone which make danger on specific square
import { square } from "src/core/models/square";
import { Color } from "src/types/Color";
import { Position } from "src/types/Position";
import { isInRange } from "./isInRange";

const stoneMap = {
  pawn: 3,
  rook: 4,
  knight: 5,
  bishop: 6,
  queen: 7,
  king: 8,
};

/*
    return 
    0: empty
    1: friend
    3: pawn
    4: rook
    5: knight
    6: bishop
    7 : queen
    8 : king
*/

const squareState = (sq: square, color: Color) => {
  if (sq.stone)
    if (sq.stone.color === color) return 1;
    else return stoneMap[sq.stone.type];
  else return 0;
};

//return true of false
export default function IsDangerOnStone(board: square[][], src: Position) {
  const square = board[src.i][src.j];
  if (!square.stone) return false;

  const colorOfStone = square.stone.color;
  //scan vertically ----------
  for (let i = src.i - 1; i >= 0; i--) {
    if (!isInRange(i, src.j)) break;
    const sT = squareState(board[i][src.j], colorOfStone);
    if (sT === 7 || sT === 4 || (sT === 8 && i === src.i - 1)) return true;
    else if (sT !== 0) break; //every thing out of king,rook,queen will not make any danger
  }
  for (let i = src.i + 1; i < 8; i++) {
    if (!isInRange(i, src.j)) break;
    const sT = squareState(board[i][src.j], colorOfStone);
    if (sT === 7 || sT === 4 || (sT === 8 && i === src.i + 1)) return true;
    else if (sT !== 0) break;
  }
  //-------------------------
  //scan Horizontally ------------
  for (let j = src.j - 1; j >= 0; j--) {
    if (!isInRange(src.i, j)) break;
    const sT = squareState(board[src.i][j], colorOfStone);
    if (sT === 7 || sT === 4 || (sT === 8 && j === src.j - 1)) return true;
    else if (sT !== 0) break;
  }
  for (let j = src.j + 1; j < 8; j++) {
    if (!isInRange(src.i, j)) break;
    const sT = squareState(board[src.i][j], colorOfStone);
    if (sT === 7 || sT === 4 || (sT === 8 && j === src.j + 1)) return true;
    else if (sT !== 0) break;
  }
  //--------------
  //scan diagonal
  for (let i = src.i + 1, j = src.j + 1; i < 8 && j < 8; i++, j++) {
    if (!isInRange(i, j)) break;
    const sT = squareState(board[i][j], colorOfStone);
    if (
      sT === 7 ||
      sT === 6 ||
      (sT === 8 && i === src.i + 1 && j === src.j + 1)
    )
      return true;
    else if (sT !== 0) break;
  }
  for (let i = src.i - 1, j = src.j - 1; i >= 0 && j >= 0; i--, j--) {
    if (!isInRange(i, j)) break;
    const sT = squareState(board[i][j], colorOfStone);
    if (
      sT === 7 ||
      sT === 6 ||
      (sT === 8 && i === src.i - 1 && j === src.j - 1)
    )
      return true;
    else if (sT !== 0) break;
  }
  //-----------
  //scan AntiDiagonal
  for (let i = src.i - 1, j = src.j + 1; i >= 0 && j < 8; i--, j++) {
    if (!isInRange(i, j)) break;
    const sT = squareState(board[i][j], colorOfStone);
    if (
      sT === 7 ||
      sT === 6 ||
      (sT === 8 && i === src.i - 1 && j === src.j + 1)
    )
      return true;
    else if (sT !== 0) break;
  }
  for (let i = src.i + 1, j = src.j - 1; i < 8 && j >= 0; i++, j--) {
    if (!isInRange(i, j)) break;
    const sT = squareState(board[i][j], colorOfStone);
    if (
      sT === 7 ||
      sT === 6 ||
      (sT === 8 && i === src.i + 1 && j === src.j - 1)
    )
      return true;
    else if (sT !== 0) break;
  }
  //----------------------
  //scan for L ( knight move)
  const knightJump = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
  ];
  for (let index = 0; index < knightJump.length; index++) {
    const [i, j] = knightJump[index];
    if (
      isInRange(i + src.i, j + src.j) &&
      squareState(board[i + src.i][j + src.j], colorOfStone) === 5
    )
      return true;
  }

  //---------------
  //scan for pawn
  if (
    isInRange(src.i - 1, src.j - 1) &&
    squareState(board[src.i - 1][src.j - 1], colorOfStone) === 3
  )
    return true;
  if (
    isInRange(src.i - 1, src.j + 1) &&
    squareState(board[src.i - 1][src.j + 1], colorOfStone) === 3
  )
    return true;
  //------------
  return false;
}
