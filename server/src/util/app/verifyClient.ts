import { app } from "../../config/firebaseApp";
import webSocket from "ws";
import { URL } from "url";
import { RequestBody } from "../../@types/ExtendedRequest";

//! danger: this approuch is unscure with http connection
export const verifyClient: webSocket.VerifyClientCallbackAsync = async (
  info,
  cb
) => {
  const params = new URL(info.req.url!).searchParams;

  const token = params.get("token");

  if (!token) return cb(false, 401, "not authorized");
  //check valid connection
  app
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      (info.req as RequestBody).uid = user.uid;
      (info.req as RequestBody).name = user.name;
      return cb(true);
    })
    .catch((e) => {
      cb(false, 401, "not authorized");
    });
};
