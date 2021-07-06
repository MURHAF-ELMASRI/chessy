import { Color } from "@type/Color";
import { Position } from "@type/Position";
import { MoveRules } from "./MoveRules";

export abstract class stone {
  constructor(
    readonly id: number,
    readonly color: Color,
    readonly move: MoveRules,
    readonly icon: any
  ) {}
}

export default stone;
