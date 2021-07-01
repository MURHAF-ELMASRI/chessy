import ExtendedSocket from "./ExtendedSocket";

export default interface ExtendedObject {
  uid?: string;
  name?: string;
  opponent?: string | ExtendedSocket;
}
