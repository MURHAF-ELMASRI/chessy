import { MessagesType } from "@chessy/common/types/message";
import { io } from "./app";

export default function send(msg: MessagesType) {
  io.send(msg);
}
