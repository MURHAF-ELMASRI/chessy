import { Message } from "src/types/Message";
import encodeMessage from "src/util/encodeMessage";
import { initializeWebSocket } from "./initializeWebSocket";

import firebase from "firebase";
import store from "src/core/store/store";
import { showActionLessNotification } from "src/core/store/reducer/notification";

class webSocketConnection {
  private url: string;
  private socket: WebSocket | undefined;
  private token: string | undefined;
  constructor(url: string) {
    this.url = url;
    console.log(this.token);
    this.socket = this.token
      ? initializeWebSocket(this.url + "?token=" + this.token)
      : undefined;
  }
  async connectServer() {
    this.token = await firebase.auth().currentUser?.getIdToken();
    console.log(this.token);

    if (this.token) {
      this.socket = initializeWebSocket(this.url + "?token=" + this.token);
    }
  }
  sendMessageToServer(message: Message) {
    if (this.socket && this.isConnectionOpen()) {
      console.log("sending to user ", message);
      this.socket.send(encodeMessage(message));
    }
  }
  getWebSocket() {
    return this.socket;
  }
  isConnectionOpen() {
    return this.socket && this.socket.OPEN === this.socket.readyState;
  }
  closeConnection() {
    this.socket?.close();
  }
}

export default webSocketConnection;

//TODO : set Error if connection is closed

// interface SendAcceptPlayPayload {}

// interface SendMovePayload {
//   move: Move;
// }

// webSocket.send(
//   JSON.stringify({
//     msg: "move",
//TODO: change this to move{src:{i,j},dest:{i,j}} in server
//     move,
//   })
// );

// const webSocketSlice = createSlice({
//   name: "webSocket",
//   initialState: {},
//   reducers: {
//     connectWebSocket: (state, action: PayloadAction<undefined>) => {
//       if (
//         !firebase.auth().currentUser?.token ||
//         webSocket.readyState !== webSocket.CLOSED
//       ) {
//         webSocket.close();
//         return;
//       }

//       const URL = appendTokenToURL(firebase.auth().currentUser.uid);
//       webSocket = initializeWebSocket(URL);
//     },
//   },
//   sendAcceptPlay: (state, action: PayloadAction<undefined>) => {

//   },

// });
