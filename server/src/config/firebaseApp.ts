import * as admin from "firebase-admin";

import serviceAccount from "./realtime-chess-24c56-firebase-adminsdk-30rkv-cbc76eb2c0.json";

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL:
    "https://realtime-chess-24c56-default-rtdb.europe-west1.firebasedatabase.app",
});
