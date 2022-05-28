import Message from "src/@types/Message";

export default (msg: string): Message => JSON.parse(msg);
