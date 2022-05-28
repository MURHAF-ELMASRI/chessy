import { ExtendedClients } from "src/@types";

export function getClientSocket(clients: ExtendedClients, uid: string) {
  for (const item of clients.values()) {
    if (item.uid === uid) return item;
  }
}
