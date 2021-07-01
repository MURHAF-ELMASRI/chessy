import WebSocket from "ws";
import { ExtendedObject } from "./ExtendedObject";

export interface ExtendedClient
  extends WebSocket.Server.clients,
    ExtendedObject {}
