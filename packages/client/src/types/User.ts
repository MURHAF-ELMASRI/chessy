export interface User {
  uid: string;
  displayName: string | null;
  email: string;
  photoURL: string | null;
  state: "offline" | "online" | "busy";
  lose: number;
  win: number;
  tie: number;
}
