import { IncomingMessage } from "http";
import ExtendedObject from "./ExtendedObject";

//extend Incoming message object
export default interface ExtendedRequest
  extends IncomingMessage,
    ExtendedObject {}
