import { Socket } from "net";
import { ExtendedSocket } from "./ExtendedSocket";

export type ExtendedObject = {
  uid?: string;
  name?: string;
  opponent?: string | ExtendedSocket;
};
