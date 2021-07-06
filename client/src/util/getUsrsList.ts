import { User } from "@type/User";
import firebase from "firebase";
import map from "lodash";

//TODO ask for help
export function getUsersList(uid: string) {
  let data: User[] = [];
  firebase
    .database()
    .ref("users")
    .on("value", (snapshot) => {
      const usersList = snapshot.val();
      if (usersList) {
        if (usersList[uid]) delete usersList[uid];
        data = map(usersList, (val: any, key: any) => ({ uid: key, ...val }));
      }
    });
  return data;
}
