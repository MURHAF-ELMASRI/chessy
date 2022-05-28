//square may have stone on it

import { Color } from "src/types/Color";
import { SquareID } from "src/types/SquareID";
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
