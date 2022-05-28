import firebase from "firebase";
import { reConnectServer } from "src/core/store/reducer/gameState";
import { showActionLessNotification } from "src/core/store/reducer/notification";
import store from "src/core/store/store";

//TODO: optimization : set users list to global state and then loop over the list to check if the user is in it.

const onAuthStateChangedCallback = async (user: firebase.User | null) => {
  //set user information in database
  //why I did this?? because firebase authentication set registered user in its own database .Though I need some user information in realtime database
  if (user) {
    firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value", (snapshot) => {
        if (!snapshot.exists())
          firebase.database().ref("users").child(user.uid).update({
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            state: "online",
          });
      });
    store.dispatch(
      showActionLessNotification({
        notificationType: "success",
        content: "you are logged in",
      })
    );
    store.dispatch(reConnectServer());
  }
};

const errorCallBack = (error: firebase.auth.Error) =>
  store.dispatch(
    showActionLessNotification({
      notificationType: "error",
      content: error.message,
    })
  );

function registerUser() {
  firebase.auth().onAuthStateChanged(onAuthStateChangedCallback, errorCallBack);
}

export default registerUser;
