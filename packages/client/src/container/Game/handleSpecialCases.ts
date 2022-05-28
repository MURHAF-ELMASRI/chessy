import boardClass from "src/core/models/board";
import { moveStone } from "src/core/store/reducer/gameState";

import store from "src/core/store/store";
import { Move } from "src/types/Move";

export function handleSpecialCases(board: boardClass, move: Move) {
  const movedStone = board.board[move.src.i][move.src.j].stone!;
  if (
    movedStone.type === "king" &&
    ((board.playerColor && move.src.j === 4) ||
      (!board.playerColor && move.src.j === 3)) &&
    (move.dest.j === 6 || move.dest.j === 1)
  ) {
    //removing rook from previous position
    const rook_dest_j = move.dest.j === 6 ? 5 : 2;
    const rook_src_j = move.dest.j === 6 ? 7 : 0;
    const newMove = {
      src: { i: 7, j: rook_src_j },
      dest: { i: 7, j: rook_dest_j },
    };
    store.dispatch(moveStone(newMove));
  }
}
