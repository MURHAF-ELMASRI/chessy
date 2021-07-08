import React from "react";
import styled, { StyledFunction } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Stone from "../stone/Stone";
import { Color } from "@type/Color";
import { SquareID } from "@type/SquareID";
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
      color="{3243}"
      selected={selected}
      onClick={handleSquareClick}
    >
      {squareObject.stone && (
        <Stone handleClick={handleSquareClick} stone={squareObject} />
      )}
    </SquareItem>
  );
};
export default Square;
