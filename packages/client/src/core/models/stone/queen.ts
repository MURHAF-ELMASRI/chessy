import { stone } from "./stone";
import { stoneIcons } from "src/assets/icons/stoneIcons";
import { Color } from "src/types/Color";
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
      "queen",
      stoneIcons.queen
    );
  }
}
export default queen;
