import { Message } from "@type/Message";
import encodeMessage from "@util/encodeMessage";
import { initializeWebSocket } from "./initializeWebSocket";

import firebase from "firebase";

class webSocketConnection {
  private url: string;
  private socket: WebSocket;
  constructor(url: string) {
    this.url = url + "?token=" + firebase.auth().currentUser?.uid;
    this.socket = initializeWebSocket(this.url);
  }
  connectServer() {
    this.socket = initializeWebSocket(this.url);
  }
  sendMessageToServer(message: Message) {
    if (this.isConnectionOpen()) this.socket.send(encodeMessage(message));
  }
  getWebSocket() {
    return this.socket;
  }
  isConnectionOpen() {
    return this.socket.CLOSED === this.socket.readyState;
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
//         !firebase.auth().currentUser?.uid ||
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
