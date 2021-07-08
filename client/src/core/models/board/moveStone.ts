//utitliy function to do the logic of moving a stone from one place to another

import { square } from "@models/square";
import { Position } from "@type/Position";

// stone jump from src to dest
export default function moveStone(
  board: square[][],
  src: Position,
  dest: Position
) {
  //delete stone from src
  const { stone, ...withOutStone } = board[src.i][src.j];
  board[src.i][src.j] = withOutStone;
  board[dest.i][dest.j] = { ...board[dest.i][dest.j], stone };
}
