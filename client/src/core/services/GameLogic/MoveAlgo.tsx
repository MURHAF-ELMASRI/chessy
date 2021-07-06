import { square } from "@models/square";
import { Color } from "@type/Color";
import { SquareID } from "@type/SquareID";
import dangerOnKing from "./DangerOnKing";
import { Position } from "@type/Position";
enum squareState {
  outOfRange,
  empty,
  friend,
  opponent,
}

//utilities
function range(i: number, j: number) {
  return i >= 0 && j >= 0 && i < 8 && j < 8;
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

function getSquareState(board: square[][], stoneColor: Color, i:number,j:number) {
  if (!range(i, j)) return squareState.outOfRange;
  if (!board[i][j].stone) return squareState.empty;
  if (board[i][j].stone.color === stoneColor) return squareState.friend;
  return squareState.opponent;
}

//Note : there is better approch to make it less coupling but I thought this will be faster,
// instead of passing the val we could return array and then adding the returned value to the array which may take more operation


function addToValArray(board:square[][],src:Position,dest:Position,stoneColor:Color,val:SquareID[]){
    const currentState = getSquareState(board, stoneColor,dest.i,dest.j);
    if ( currentState === squareState.empty ||
        currentState === squareState.friend ||
         dangerOnKing(board, src.i, src.j, dest.i, dest.j)
     )
      return false
    val.push(board[dest.i][dest.j].id);
    if (currentState === squareState.opponent) return false;
    return true;
}

function addVertical(
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
) {
  for (let k = src.i + 1; k < 8; k++) {
      const dest={i:k,j:src.j}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }

  for (let k = src.i - 1; k >= 0; k--) {
    const dest={i:k,j:src.j}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }
}

function addHorizontal( 
  board: square[][],
  stoneColor: Color,
  val: SquareID[],
  src: Position
  ) {
      
  for (let k = src.j + 1; k < 8; k++) {
    const dest={i:k,j:src.j}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }

  for (let k = src.j - 1; k >= 0; k--) {
    const dest={i:k,j:src.j}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }
}

function addDiagonal( 
    board: square[][],
    stoneColor: Color,
    val: SquareID[],
    src: Position
    ) {
  for (let a = src.i + 1, b = src.j + 1; a < 8 && b < 8; a++, b++) {
    const dest={i:a,j:b}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }
  for (let a = src.i - 1, b = src.j - 1; a >= 0 && b >= 0; a--, b--) {
    const dest={i:a,j:b}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
    }
    }
    
function addAntiDiagonal(
    board: square[][],
    stoneColor: Color,
    val: SquareID[],
    src: Position
    ) {
  for (let a = src.i - 1, b = src.j + 1; a >= 0 && b < 8; a--, b++) {
    const dest={i:a,j:b}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }
  for (let a = src.i + 1, b = src.j - 1; a < 8 && b >= 0; a++, b--) {
    const dest={i:a,j:b}
    if(!addToValArray(board,src,dest,stoneColor,val))
        break
  }
}

function kingMove(
    board: square[][],
    stoneColor: Color,
    val: SquareID[],
    src: Position){
    
}

/*------------object of functions for every stone------------------ */
//take position of stone and
//return list of square Where stone can go

export const move = {
  king: (board, stoneColor, pos.i, pos.j) => {
    const val = [];
    //special case for king
    //TODO : allow it if the king in the first move
    if (
      (stoneColor && pos.i === 7 && pos.j === 4) ||
      (!stoneColor && pos.i === 7 && pos.j === 3)
    ) {
      let control = true;
      //right flip
      if (
     getSquareState(board, stoneColor, 7, 7) === squareState.friend &&
        board[7][7].stone.type === "rook"
      ) {
        for (let k = pos.j + 1; k < 6; k++)
          if (board[pos.i][k].stone) {
            control = false;
            break;
          }
          
        if (control && !dangerOnKing(board, pos.i, pos.j, pos.i, 6))
          val.push(board[pos.i][6].id);
      }

      //left flip
      control = true;
      if (
     getSquareState(board, stoneColor, 7, 0) === 3 &&
        board[7][0].stone.type === "rook"
      ) {
        for (let k = pos.j - 1; k >= 1; k--)
          if (board[pos.i][k].stone) {
            control = false;
            break;
          }
        if (control && !dangerOnKing(board, pos.i, pos.j, pos.i, 1))
          val.push(board[pos.i][1].id);
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
      const [iTarget, jTarget] = e;
      const pass = getSquareState(board, stoneColor, pos.i + iTarget, pos.j + jTarget);

      if (
        (pass === options["empty"] || pass === options["opponent"]) &&
        !dangerOnKing(board, pos.i, pos.j, pos.i + iTarget, pos.j + jTarget)
      )
        val.push(board[pos.i + iTarget][pos.j + jTarget].id);
    });
    return val;
  },
  queen: (board, stoneColor, pos.i, pos.j) => {
    const val = [];
    addVertical(board, stoneColor, val, pos.i, pos.j);
    addHorizontal(board, stoneColor, val, pos.i, pos.j);
    addDiagonal(board, stoneColor, val, pos.i, pos.j);
    addAntiDiagonal(board, stoneColor, val, pos.i, pos.j);
    return val;
  },
  rook: (board, stoneColor, pos.i, pos.j) => {
    const val = [];
    addVertical(board, stoneColor, val, pos.i, pos.j);
    addHorizontal(board, stoneColor, val, pos.i, pos.j);
    return val;
  },
  bishop: (board, stoneColor, pos.i, pos.j) => {
    const val = [];
    addDiagonal(board, stoneColor, val, pos.i, pos.j);
    addAntiDiagonal(board, stoneColor, val, pos.i, pos.j);
    return val;
  },
  /**
   *
   * @param {Array(Array)} board
   * @param {Number} pos.i
   * @param {Number} pos.j
   * @param {boolean} stoneColor
   */

  knight: (board, stoneColor, pos.i, pos.j) => {
    const val = [];
    [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
    ].forEach((e) => {
      //it is not just for pos it is 8 but we could reverse pos.i and pos.j to get the other one
      const [iTarget, jTarget] = e;
      let pass = getSquareState(board, stoneColor, pos.i + iTarget, pos.j + jTarget);

      if (
        (pass === options["empty"] || pass === options["opponent"]) &&
        !dangerOnKing(board, pos.i, pos.j, pos.i + iTarget, pos.j + jTarget) &&
        range(pos.i + iTarget, pos.j + jTarget)
      )
        val.push(board[pos.i + iTarget][pos.j + jTarget].id);

      pass = getSquareState(board, stoneColor, pos.i + jTarget, pos.j + iTarget);

      if (
        (pass === options["empty"] || pass === options["opponent"]) &&
        !dangerOnKing(board, pos.i, pos.j, pos.i + jTarget, pos.j + iTarget) &&
        range(pos.i + jTarget, pos.j + iTarget)
      )
        val.push(board[pos.i + jTarget][pos.j + iTarget].id);
    });
    return val;
  },
  //as pawn moves is affected by stone player color we have to handle this use
  pawn: (board, stoneColor, pos.i, pos.j) => {
    if (!board[pos.i][pos.j].stone) return [];
    const val = [];
    const pawnMove = stoneColor ? 1 : -1;
    //check if stone could eat the oppoenet in the upper right
    if (
     getSquareState(board, stoneColor, pos.i - 1, pos.j - 1) === options["opponent"] &&
      !dangerOnKing(board, pos.i, pos.j, pos.i - 1, pos.j - 1)
    )
      val.push(board[pos.i - 1][pos.j - 1].id);
    //if stone could eat the oppoent in the upper left
    if (
     getSquareState(board, stoneColor, pos.i - 1, pos.j + 1) === options["opponent"] &&
      !dangerOnKing(board, pos.i, pos.j, pos.i - 1, pos.j + 1)
    )
      val.push(board[pos.i - 1][pos.j + 1].id);

    //two jump of one jump for pawn
    if (
     getSquareState(board, stoneColor, pos.i - 1, pos.j) === options["empty"] &&
      !dangerOnKing(board, pos.i, pos.j, pos.i - 1, pos.j)
    ) {
      val.push(board[pos.i - 1][pos.j].id);
      if (
        Number(pos.i) === 6 &&
     getSquareState(board, stoneColor, pos.i - 2, pos.j) === options["empty"] &&
        !dangerOnKing(board, pos.i, pos.j, pos.i - 2, pos.j)
      )
        val.push(board[pos.i - 2][pos.j].id);
    }

    return val;
  },
  //just the pawn pace's moves have constraints with color note that this constraints are just for pawn
};
