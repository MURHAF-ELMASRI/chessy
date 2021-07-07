import { Color } from "@type/Color";
import { Position } from "@type/Position";
import { Stone } from "@type/Stone";
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
