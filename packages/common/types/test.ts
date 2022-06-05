export type DisconnectedEvent = {
    type: "disconnected";
    payload: number;
  };
  
  export type RequestPlayEvent = {
    type: "requestPlay";
    payload: string;
  };
  
  export type NotAuthorizedEvent = {
    type: "notAuthorized";
  };
  
  export type ServerEvents =
    | DisconnectedEvent
    | RequestPlayEvent
    | NotAuthorizedEvent;
  
  type GetPayload<Event> = Event extends { payload?: any } ? [Event["payload"]] : [];
  
  type ServerEventPayloadArgumentsMap  = {
      [E in ServerEvents["type"]]: GetPayload<Extract<ServerEvents, { type: E }>>
  }
  
  function test<E extends keyof ServerEventPayloadArgumentsMap>(first: E, ...args: ServerEventPayloadArgumentsMap[E]) {}
  
  test("disconnected", 0)
  test("requestPlay", "foo")
  test("notAuthorized")


//
// index accessor
// export type DisconnectedEvent = {
//     type: "disconnected";
//     payload: number;
//   };
  
//   export type RequestPlayEvent = {
//     type: "requestPlay";
//     payload: string;
//   };
  
//   export type NotAuthorizedEvent = {
//     type: "notAuthorized";
//   };
  
//   export type ServerEvents =
//     | DisconnectedEvent
//     | RequestPlayEvent
//     | NotAuthorizedEvent;
  
//   type GetPayload<Event> = Event extends { payload?: any } ? Event["payload"] : undefined;
  
//   type ServerEventPayloadMap  = {
//       [E in ServerEvents["type"]]: GetPayload<Extract<ServerEvents, { type: E }>>
//   }
  
//   function test<E extends keyof ServerEventPayloadMap>(first: E, second: ServerEventPayloadMap[E]) {
      
//     }
  
//   test("disconnected", 0)
//   test("requestPlay", "foo")
//   test("notAuthorized", undefined)
