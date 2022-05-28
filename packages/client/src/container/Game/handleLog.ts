import boardClass from "src/core/models/board";
import { setLogs } from "src/core/store/reducer/logs";
import store from "src/core/store/store";
import { Move } from "src/types/Move";

export function handleLog(board: boardClass, move: Move) {
  const srcSquare = board.board[move.src.i][move.src.j];
  const destSquare = board.board[move.dest.i][move.dest.j];
  if (!srcSquare.stone) return;

  store.dispatch(
    setLogs(
      `${srcSquare.stone.color ? "white" : "black"} ${
        srcSquare.stone.type
      } moved from ${srcSquare.id} to ${destSquare.id} ${
        destSquare.stone
          ? "killed " +
            (destSquare.stone.color ? "white " : "black ") +
            destSquare.stone.type
          : ""
      }`
    )
  );
}
