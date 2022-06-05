import webSocketConnection from "src/core/models/webSocket";
if (!process.env.REACT_APP_WS_SERVER) {
  throw new Error("websocket url is not set");
}
export const gameConnection = new webSocketConnection(
  process.env.REACT_APP_WS_SERVER
);
