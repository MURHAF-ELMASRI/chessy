import moveStone from "./moveStone";
import { cloneDeep } from "lodash";
import { isInRange } from "./isInRange";
import { square } from "@models/square";
import { Position } from "@type/Position";
import IsDangerOnStone from "./dangerOnStone";

//this utility function is to check if any  opponent rock
//could make danger on the king
//it answer the question : Is there any danger by the opponent if a stone go from src to dest

//how : suppose the stone went the the targeted square --then-> check if there is any danger of king

export default function DangerOnKing(
  board: square[][],
  src: Position,
  dest: Position,
  kingPosition: Position
) {
  if (!isInRange(dest.i, dest.j)) return false;
  //find the position of the king
  const newBord = cloneDeep(board);
  moveStone(newBord, src, dest);
  return IsDangerOnStone(newBord, kingPosition);
}
