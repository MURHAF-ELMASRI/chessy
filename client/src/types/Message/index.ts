import { AcceptPlayMessage } from "./AcceptPlayMessage";
import { MoveMessage } from "./MoveMessage";
import { RejectMessage } from "./RejectMessage";

export type Message = AcceptPlayMessage | MoveMessage | RejectMessage;
