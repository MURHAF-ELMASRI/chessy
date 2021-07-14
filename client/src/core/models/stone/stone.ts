import { Color } from "src/types/Color";
import { Stone } from "src/types/Stone";
import { MoveRules } from "./MoveRules";

export abstract class stone {
  constructor(
    readonly id: number,
    readonly color: Color,
    readonly move: MoveRules,
    readonly type: Stone,
    readonly icon: any
  ) {}
}

export default stone;
