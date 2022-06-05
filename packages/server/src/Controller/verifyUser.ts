import jwt from "jsonwebtoken";
import { isString } from "lodash";
import process from "process";
import { Socket } from "socket.io";
import { getValueFromQuey } from "../util/getUserIdFromQuery";

export default function verifyUser(socket: Socket) {
  if (!process.env.JWT_SECRETE_KEY) {
    throw new Error("Authentication error");
  }
  const token = getValueFromQuey(socket);

  if (token) {
    const payload = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    if (isString(payload)) {
      return undefined;
    }
    return payload.userId as string;
  }
}
