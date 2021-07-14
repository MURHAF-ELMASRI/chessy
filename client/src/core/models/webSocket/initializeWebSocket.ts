import { StrictMode } from "react";
import { color } from "src/constants/color";
import { showRequestPlayDialog } from "src/core/store/reducer/dialog";
import {
  checkLose,
  moveStone,
  setBoard,
  setIsPlaying,
} from "src/core/store/reducer/gameState";
import { changeTurn, startGame } from "src/core/store/reducer/gameState";
import { deleteLogs } from "src/core/store/reducer/logs";
import { showActionLessNotification } from "src/core/store/reducer/notification";
import { AppDispatch, RootState } from "src/core/store/store";
import { getStore } from "src/core/store/storeHelper";

import decodeMessage from "src/util/decodeMessage";
export function initializeWebSocket(url: string): WebSocket {
  const webSocket = new WebSocket(url);
  const store = getStore();

  const storeObj = { store };
  webSocket.onmessage = (msg: MessageEvent) => {
    const receivedMessage = decodeMessage(msg.data);
    console.log("received Message", receivedMessage);
    switch (receivedMessage.msg) {
      case "chat":
        console.log("chat");
        break;
      case "request-play":
        console.log("request-play hit");

        store.dispatch(
          showRequestPlayDialog({
            opponentColor: receivedMessage.playerColor,
            opponentName: receivedMessage.displayName,
          })
        );

        break;
      case "reject-play":
        console.log("reject-play hit");
        store.dispatch(
          showActionLessNotification({
            notificationType: "error",
            content: `${receivedMessage.displayName} reject your inviting 😥`,
          })
        );
        break;
      case "error":
        store.dispatch(
          showActionLessNotification({
            notificationType: "error",
            //TODO: set type of message between server and client
            content: receivedMessage.content,
          })
        );
        break;
      case "set-play":
        const gameState = {
          playingColor: receivedMessage.color,
          isPlayerTurn: receivedMessage.color === color.black ? false : true,
        };

        store.dispatch(startGame(gameState));
        store.dispatch(deleteLogs());
        store.dispatch(
          showActionLessNotification({
            notificationType: "success",
            content: "Game started 🏁",
          })
        );
        console.log(gameState.playingColor);
        store.dispatch(setBoard({ color: gameState.playingColor }));
        break;
      case "win":
        //setIs Playing
        //re init player state
        store.dispatch(
          showActionLessNotification({
            notificationType: "success",
            content: "Congrats you win 💪🥳🎉",
          })
        );
        store.dispatch(setIsPlaying(false));
        break;
      case "move":
        console.log(receivedMessage.move);
        const reverseMoveSrc = {
          i: 7 - receivedMessage.move.src.i,
          j: 7 - receivedMessage.move.src.j,
        };

        const reverseMoveDest = {
          i: 7 - receivedMessage.move.dest.i,
          j: 7 - receivedMessage.move.dest.j,
        };
        store.dispatch(
          moveStone({ src: reverseMoveSrc, dest: reverseMoveDest })
        );
        store.dispatch(changeTurn());
        store.dispatch(checkLose());
        break;

      case "lose":
        store.dispatch(setIsPlaying(false));
        store.dispatch(
          showActionLessNotification({
            notificationType: "error",
            content: "Sorry! you are lost 😢",
          })
        );
        break;
      default:
        store.dispatch(
          showActionLessNotification({
            notificationType: "error",
            content:
              "Error speaking with server. unknown request: " +
              receivedMessage.msg,
          })
        );
        break;
    }
  };
  webSocket.onerror = (e) => {
    store.dispatch(
      showActionLessNotification({
        notificationType: "error",
        content: "Error connecting with server ",
      })
    );
  };
  webSocket.onclose = (e) => {
    store.dispatch(
      showActionLessNotification({
        notificationType: "error",
        content: "you are not connected to server",
      })
    );
  };
  return webSocket;
}
