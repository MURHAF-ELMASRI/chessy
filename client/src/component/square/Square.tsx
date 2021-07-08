import React from "react";
import Stone from "../stone/Stone";
import { useCallback } from "react";
import { square } from "@models/square";
import { Position } from "@type/Position";
import SquareItem from "./SquareItem";

interface Props {
  squareObject: square;
  handleClick: (position: Position) => void;
  position: Position;
  selected: boolean;
}

const Square = ({ squareObject, handleClick, position, selected }: Props) => {
  const handleSquareClick = useCallback(() => {
    handleClick(position);
  }, []);

  return (
    <SquareItem
      color2={squareObject.color}
      selected={selected}
      onClick={handleSquareClick}
    >
      {squareObject.stone && (
        <Stone handleClick={handleSquareClick} stone={squareObject.stone} />
      )}
    </SquareItem>
  );
};
export default Square;
