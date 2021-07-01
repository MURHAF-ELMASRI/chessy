import ExtendedObject from "./ExtendedObject";
import ExtendedSocket from "./ExtendedSocket";

export default interface ExtendedClient
  extends Set<ExtendedSocket>,
    ExtendedObject {}
