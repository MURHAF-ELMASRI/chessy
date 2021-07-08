import { setMoveMessage } from "@store/reducer/gameState";
import { showActionLessNotification } from "@store/reducer/notification";
import store from "@store/store";
import decodeMessage from "@util/decodeMessage";

export function initializeWebSocket(url: string): WebSocket {
  const webSocket = new WebSocket(url);

  webSocket.onmessage = (msg: MessageEvent) => {
    const receivedMessage = decodeMessage(msg.data);
    console.log("received Message", receivedMessage.msg);
    switch (receivedMessage.msg) {
      case "move":
        console.log("moving");
        //dispatch set move according to the message from server
        break;
      case "chat":
        console.log("chat");
        break;
      case "request-play":
        console.log("request-play hit");
        //TO DO: add request play dialog
        break;
      case "reject-play":
        store.dispatch(
          showActionLessNotification({
            notificationType: "error",
            content: `${receivedMessage.name} reject your inviting 😥`,
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
      case "accept-play":
        /*
        TODO:
        dispatch:
        setTurn of player 
        setPlayerColor
        setIsPlaying
        setStatGame
        set logs to "" delete the logs

        */
        store.dispatch(
          showActionLessNotification({
            notificationType: "success",
            content: "Game started 🏁",
          })
        );
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
        break;
      case "move":
        store.dispatch(setMoveMessage(receivedMessage.move));
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

    webSocket.onerror = (e) => {
      store.dispatch(
        showActionLessNotification({
          notificationType: "error",
          content: "Error connecting with server ",
        })
      );
    };
  };
  return webSocket;
}
