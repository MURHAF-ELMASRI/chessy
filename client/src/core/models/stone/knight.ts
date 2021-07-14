import { stone } from "./stone";
import { stoneIcons } from "src/assets/icons/stoneIcons";
import { Color } from "src/types/Color";
import { MoveRules } from "./MoveRules";

export class knight extends stone {
  constructor(readonly id: number, readonly color: Color) {
    super(id, color, MoveRules.knight, "knight", stoneIcons.knight);
  }
}
export default knight;
