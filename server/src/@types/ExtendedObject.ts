import { Color } from "./Color";
import ExtendedSocket from "./ExtendedSocket";

export default interface ExtendedObject {
  uid?: string;
  displayName?: string;
  opponent?: string | ExtendedSocket;
  playerColor?: Color;
}
