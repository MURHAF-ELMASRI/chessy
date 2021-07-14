import firebase from "firebase-admin";

export default function setUserOnline(uid: string) {
  firebase
    .database()
    .ref("/users")
    .child(uid)
    .update({
      state: "online",
    })
    .catch((e) => console.log(e.message));
}
