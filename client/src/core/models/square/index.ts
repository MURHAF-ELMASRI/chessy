//square may have stone on it

import { Color } from "@type/Color";
import { SquareID } from "@type/SquareID";
import stone from "../stone/stone";

export class square {
  constructor(readonly id: SquareID, color: Color, public stone?: stone) {}
}
