//square may have stone on it

import { Color } from "@type/Color";
import { SquareID } from "@type/SquareID";
import { immerable } from "immer";
import stone from "../stone/stone";

export class square {
  [immerable] = true;
  constructor(
    readonly id: SquareID,
    readonly color: Color,
    public stone?: stone
  ) {}
}
