/**
 * close : deprecated: to request close
 * disconnected: to inform user about the the disconnect user
 * request-play: to send request play from player a to play b
 */

import { Color } from "./Color";

//close event
type CloseSocketEvent = {
  type: "close";
};

//disconnected event
export type DisconnectedPayload = {
  oppId: string;
};
export type DisconnectedEvent = {
  type: "disconnected";
  payload: DisconnectedPayload;
};

//requestPlay
export type RequestPlayPayload = {
  _id: string;
  color: Color;
};
export type RequestPlayEvent = {
  type: "requestPlay";
  payload: RequestPlayPayload;
};

//notAuthorized
export type NotAuthorizedEvent = {
  type: "notAuthorized";
};

export type ServerEvents =
  | CloseSocketEvent
  | DisconnectedEvent
  | RequestPlayEvent
  | NotAuthorizedEvent;


type GetPayload <Event>= Event extends {payload:any}?[Event['payload']]:[]
  
export type ServerEventPayloadMap = {
  [K in ServerEvents['type']]: GetPayload<Extract<ServerEvents, {type:K}>>
}




