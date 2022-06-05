import { Server } from "socket.io";
import { requestPlayHandler } from "./handlers";

// const handlers: Record<ClientEvents, (payload: any) => void> = {
//   error: function(payload) {},
//   register: () => {},
//   "request-play": requestPlayHandler,
// };

export default function registerController(io: Server) {
  io.on("requestPlay", requestPlayHandler);
}
