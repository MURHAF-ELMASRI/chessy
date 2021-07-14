import ExtendedSocket from "src/@types/ExtendedSocket";

export default function cancelHandler({ socket }: { socket: ExtendedSocket }) {
  socket.opponent = "";
  console.log("cancel request ", socket.displayName);
}
