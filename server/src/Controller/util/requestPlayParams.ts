import { Server } from "ws";
import { ExtendedSocket } from "../../@types/ExtendedSocket";
import { color } from "../../constant/color";

export interface requestPlayParams {
  socket: ExtendedSocket;
  clients: Set<ExtendedSocket>;
  opponentUID: string;
  color: typeof color;
}
