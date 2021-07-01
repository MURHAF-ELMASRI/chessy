import { IncomingMessage } from "http";
import { ExtendedObject } from "./ExtendedObject";

//extend Incoming message object
export type ExtendedRequest = IncomingMessage & ExtendedObject;
