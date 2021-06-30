import ws from "ws";

export default function isObject(varibale: any) {
  return typeof varibale === "object" && varibale !== null;
}
