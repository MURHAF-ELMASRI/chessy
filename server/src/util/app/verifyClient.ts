import { app } from "../../config/firebaseApp";
import webSocket from "ws";
import { URL } from "url";
import { ExtendedRequest, ExtendedSocket } from "src/@types";

//! danger: this approuch is unscure with http connection
export const verifyClient: webSocket.VerifyClientCallbackAsync = async (
  info,
  cb
) => {
  if (!info.req.url) {
    cb(false, 300, "Bad Connection");
    return;
  }
  let params: URLSearchParams;
  if (process.env.NODE_ENV !== "production")
    params = new URL("http://127.0.0.1" + info.req.url).searchParams;
  else params = new URL(info.req.url).searchParams;
  console.log("params");
  const token = params.get("token");
  if (!token) return cb(false, 401, "not authorized");
  //check valid connection
  app
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      console.log(user);
      (info.req as ExtendedRequest).uid = user.uid;
      (info.req as ExtendedRequest).displayName = user.name;
      console.log("verified connection");
      return cb(true);
    })
    .catch((e) => {
      console.log(e.message);
      cb(false, 401, "not authorized");
    });
};
