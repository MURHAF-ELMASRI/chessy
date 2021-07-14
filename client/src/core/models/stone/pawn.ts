import { stone } from "./stone";
import { stoneIcons } from "src/assets/icons/stoneIcons";
import { Color } from "src/types/Color";
import { MoveRules } from "./MoveRules";

export class pawn extends stone {
  constructor(readonly id: number, readonly color: Color) {
    super(id, color, MoveRules.pawn, "pawn", stoneIcons.pawn);
  }
}
export default pawn;
