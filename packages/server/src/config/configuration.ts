import dotenv from "dotenv";
import { Socket } from "socket.io";
dotenv.config();

export type UserState = "online" | "busy" | "playing";

export type UserSocket = {
  userId: string;
  state: UserState;
  socket: Socket;
};

export const CONNECTED_USERS = new Map<string, UserSocket>();

export default function configure() {}
