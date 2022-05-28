import { color } from "src/constants/color";
import boardClass from "src/core/models/board";
import { Color } from "src/types/Color";
import { Position } from "src/types/Position";

//TODO: optimize this function
export function isPlayerStone(
  board: boardClass["board"],
  position: Position,
  playerColor: Color
) {
  const stone = board[position.i][position.j].stone;
  return (
    stone &&
    ((stone.id > 16 && playerColor === color.white) ||
      (stone.id <= 16 && playerColor === color.black))
  );
}
