import { Move } from "./Move";

export default interface Message {
  msg: string;
  color?: boolean;
  move?: Move;
}
