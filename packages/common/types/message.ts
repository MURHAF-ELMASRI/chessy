import { Color } from "./Color";
export type ClientEventType = "error" | "register" | "request-play";

export type NotAuthorizedMsg = {
  type: "error";
  payload: {
    msg: string;
  };
};

export type SendTokenMsg = {
  type: "register";
  payload: {
    token: string;
  };
};

export type RequestPlayPayload = {
  oppId: string;
  color: Color;
};

export type RequestPlayMsg = {
  type: "request-play";
  payload: RequestPlayPayload;
};

export type ClientEvents = NotAuthorizedMsg | SendTokenMsg | RequestPlayMsg;

