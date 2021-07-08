import { stone } from "./stone";
import { stoneIcons } from "@icons/stoneIcons";
import { Color } from "@type/Color";
import { Position } from "@type/Position";
import { MoveRules } from "./MoveRules";

export class knight extends stone {
  constructor(readonly id: number, readonly color: Color) {
    super(id, color, MoveRules.knight, "knight", stoneIcons.knight);
  }
}
export default knight;