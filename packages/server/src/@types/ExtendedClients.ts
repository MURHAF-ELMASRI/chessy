import ExtendedObject from "./ExtendedObject";
import ExtendedSocket from "./ExtendedSocket";

export default interface ExtendedClients
  extends Set<ExtendedSocket>,
    ExtendedObject {}
