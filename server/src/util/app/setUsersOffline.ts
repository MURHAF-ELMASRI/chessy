import { app } from "../../config/firebaseApp";
export async function setUsersOffline() {
  try {
    const snapshot = await app.database().ref("/users/").get();
    snapshot.forEach(function (child) {
      child.ref.update({
        state: "offline",
      });
    });
  } catch (e) {
    console.log(e.message);
  }
}
