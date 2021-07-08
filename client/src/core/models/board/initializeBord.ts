import { stoneClasses } from "@models/stone";
import { color } from "@constants/color";
import { Stone } from "@type/Stone";
import { Color } from "@type/Color";
import "@models/square";
import { square } from "@models/square";

const MakeStoneObject = (stone: Stone, id: number, color: Color) => {
  switch (stone) {
    case "rook":
      return new stoneClasses.rook(id, color);
    case "bishop":
      return new stoneClasses.bishop(id, color);
    case "king":
      return new stoneClasses.king(id, color);
    case "pawn":
      return new stoneClasses.pawn(id, color);
    case "rook":
      return new stoneClasses.rook(id, color);
    case "knight":
      return new stoneClasses.knight(id, color);
    case "queen":
      return new stoneClasses.queen(id, color);
    default:
      break;
  }
};

const blackStoneObjects = [
  MakeStoneObject("rook", 1, color.black),
  MakeStoneObject("knight", 2, color.black),
  MakeStoneObject("bishop", 3, color.black),
  MakeStoneObject("queen", 4, color.black),
  MakeStoneObject("king", 5, color.black),
  MakeStoneObject("bishop", 6, color.black),
  MakeStoneObject("knight", 7, color.black),
  MakeStoneObject("rook", 8, color.black),
  MakeStoneObject("pawn", 9, color.black),
  MakeStoneObject("pawn", 10, color.black),
  MakeStoneObject("pawn", 11, color.black),
  MakeStoneObject("pawn", 12, color.black),
  MakeStoneObject("pawn", 13, color.black),
  MakeStoneObject("pawn", 14, color.black),
  MakeStoneObject("pawn", 15, color.black),
  MakeStoneObject("pawn", 16, color.black),
];
const whiteStoneObjects = [
  MakeStoneObject("pawn", 17, color.white),
  MakeStoneObject("pawn", 18, color.white),
  MakeStoneObject("pawn", 19, color.white),
  MakeStoneObject("pawn", 20, color.white),
  MakeStoneObject("pawn", 21, color.white),
  MakeStoneObject("pawn", 22, color.white),
  MakeStoneObject("pawn", 23, color.white),
  MakeStoneObject("pawn", 24, color.white),
  MakeStoneObject("rook", 25, color.white),
  MakeStoneObject("knight", 26, color.white),
  MakeStoneObject("bishop", 27, color.white),
  MakeStoneObject("queen", 28, color.white),
  MakeStoneObject("king", 29, color.white),
  MakeStoneObject("bishop", 30, color.white),
  MakeStoneObject("knight", 31, color.white),
  MakeStoneObject("rook", 32, color.white),
];
export const initializeBord = (playerColor: Color) => {
  if (playerColor === color.white) return initialBoard;
  else return initialBoard.reverse().map((e) => e.reverse().map((e) => e));
};
const initialBoard = [
  [
    new square("a8", color.white, blackStoneObjects[0]),
    new square("b8", color.black, blackStoneObjects[1]),
    new square("c8", color.white, blackStoneObjects[2]),
    new square("d8", color.black, blackStoneObjects[3]),
    new square("e8", color.white, blackStoneObjects[4]),
    new square("f8", color.black, blackStoneObjects[5]),
    new square("g8", color.white, blackStoneObjects[6]),
    new square("h8", color.black, blackStoneObjects[7]),
  ],

  [
    new square("a7", color.black, blackStoneObjects[8]),
    new square("b7", color.white, blackStoneObjects[9]),
    new square("c7", color.black, blackStoneObjects[10]),
    new square("d7", color.white, blackStoneObjects[11]),
    new square("e7", color.black, blackStoneObjects[12]),
    new square("f7", color.white, blackStoneObjects[13]),
    new square("g7", color.black, blackStoneObjects[14]),
    new square("h7", color.white, blackStoneObjects[15]),
  ],
  [
    new square("a6", color.white),
    new square("b6", color.black),
    new square("c6", color.white),
    new square("d6", color.black),
    new square("e6", color.white),
    new square("f6", color.black),
    new square("g6", color.white),
    new square("h6", color.black),
  ],
  [
    new square("a5", color.black),
    new square("b5", color.white),
    new square("c5", color.black),
    new square("d5", color.white),
    new square("e5", color.black),
    new square("f5", color.white),
    new square("g5", color.black),
    new square("h6", color.white),
  ],
  [
    new square("a4", color.white),
    new square("b4", color.black),
    new square("c4", color.white),
    new square("d4", color.black),
    new square("e4", color.white),
    new square("f4", color.black),
    new square("g4", color.white),
    new square("h4", color.black),
  ],
  [
    new square("a3", color.black),
    new square("b3", color.white),
    new square("c3", color.black),
    new square("d3", color.white),
    new square("e3", color.black),
    new square("f3", color.white),
    new square("g3", color.black),
    new square("h3", color.white),
  ],
  [
    new square("a2", color.white, whiteStoneObjects[0]),
    new square("b2", color.black, whiteStoneObjects[1]),
    new square("c2", color.white, whiteStoneObjects[2]),
    new square("d2", color.black, whiteStoneObjects[3]),
    new square("e2", color.white, whiteStoneObjects[4]),
    new square("f2", color.black, whiteStoneObjects[5]),
    new square("g2", color.white, whiteStoneObjects[6]),
    new square("h2", color.black, whiteStoneObjects[7]),
  ],

  [
    new square("a1", color.black, whiteStoneObjects[8]),
    new square("b1", color.white, whiteStoneObjects[9]),
    new square("c1", color.black, whiteStoneObjects[10]),
    new square("d1", color.white, whiteStoneObjects[11]),
    new square("e1", color.black, whiteStoneObjects[12]),
    new square("f1", color.white, whiteStoneObjects[13]),
    new square("g1", color.black, whiteStoneObjects[14]),
    new square("h1", color.white, whiteStoneObjects[15]),
  ],
];
export default initializeBord;
