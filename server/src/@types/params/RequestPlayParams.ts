import { Color } from "../Color";
import ExtendedSocket from "../ExtendedSocket";

export default interface RequestPlayParams {
  socket: ExtendedSocket;
  clients: Set<ExtendedSocket>;
  opponentUID: string;
  playerColor: Color;
}
