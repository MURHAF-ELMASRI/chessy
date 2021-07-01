import ExtendedSocket from "../../@types/ExtendedSocket";

export default function cancelHandler({ socket }: { socket: ExtendedSocket }) {
  //TODO: check losing
  socket.opponent = "";
  console.log("cancel request ", socket.name);
}
