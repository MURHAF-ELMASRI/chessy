import { stone } from "./stone";
import { stoneIcons } from "@icons/stoneIcons";
import { Color } from "@type/Color";
import { Position } from "@type/Position";
import { MoveRules } from "./MoveRules";

export class queen extends stone {
  constructor(readonly id: number, readonly color: Color) {
    super(
      id,
      color,
      MoveRules.horizontal |
        MoveRules.vertical |
        MoveRules.diagonal |
        MoveRules.antiDiagonal,
      stoneIcons.queen
    );
  }
}
export default queen;
