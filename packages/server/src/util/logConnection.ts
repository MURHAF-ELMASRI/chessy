import { ExtendedRequest } from "src/@types";

export function logConnection(req: ExtendedRequest) {
  console.log("-------------------------");
  console.log("connecting from ", req.socket.remoteAddress);
  console.log(req.displayName, req.uid);
  console.log("-------------------------");
}
