import ExtendedObject from "./ExtendedObject";
import webSocket from "ws";
export default interface ExtendedSocket extends ExtendedObject, webSocket {}
