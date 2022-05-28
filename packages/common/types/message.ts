type MessageType = "error" | "register";

type Message = {
  type: MessageType;
  payload: any;
};

type NotAuthorizedMsg = {
  type: "error";
  payload: {};
};

type SendToken = {
  type: "register";
  payload: {
    token: string;
  };
};

export type MessagesType = NotAuthorizedMsg | SendToken;
