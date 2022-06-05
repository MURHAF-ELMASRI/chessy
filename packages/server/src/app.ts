import { createServer } from "http";
import { Server } from "socket.io";
import "./config/configuration";
import { CONNECTED_USERS, UserSocket } from "./config/configuration";
import registerController from "./Controller/controller";
import verifyUser from "./Controller/verifyUser";
import send from "./send";

const httpServer = createServer();

export const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("connect ");

  registerController(io);

  const userId = verifyUser(socket);

  if (!userId) {
    send(socket, "notAuthorized");
    return;
  }

  if (!CONNECTED_USERS.has(userId)) {
    const user: UserSocket = {
      userId,
      state: "online",
      socket: socket,
    };

    CONNECTED_USERS.set(userId, user);
  }
});

io.listen(Number(process.env.PORT) || 8080);
