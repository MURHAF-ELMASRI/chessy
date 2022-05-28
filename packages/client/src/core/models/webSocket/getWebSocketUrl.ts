import firebase from "firebase";

//! danger: this approach is insecure in http connection
export function getWebSocketUrl(): string {
  const url = process.env.REACT_APP_WS_SERVER;
  return url + "?token=" + firebase.auth().currentUser?.uid;
}
