import net from "net";

export default interface UserSocket extends net.Socket {
  opponent?: net.Socket | string;
  uid?: string;
}
