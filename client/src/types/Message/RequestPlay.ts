import { Color } from "@type/Color";
import { Move } from "@type/Move";

export interface RequestPlay {
  msg: "request-play";
  opponentUID: string;
  color: Color;
}
