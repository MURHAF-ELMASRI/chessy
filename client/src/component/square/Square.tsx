import React, { useMemo } from "react";
import Stone from "../stone/Stone";
import { useCallback } from "react";
import { square } from "src/core/models/square";
import { Position } from "src/types/Position";
import SquareItem from "./SquareItem";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { clickSquare, sendMove } from "src/core/store/reducer/gameState";
import { useAppSelector } from "src/hooks/useAppSelector";
import { changeTurn } from "src/core/store/reducer/gameState";

interface Props {
  position: Position;
}

const Square = ({ position }: Props) => {
  const dispatch = useAppDispatch();
  const [
    board,
    selectedSquarePosition,
    whereStoneCanGo,
    currentSquare,
    isPlayerTurn,
    isPlaying,
  ] = useAppSelector((state) => [
    state.gameState.board.board,
    state.gameState.selectedSquarePosition,
    state.gameState.whereStoneCanGo,
    state.gameState.board.board[position.i][position.j],
    state.gameState.isPlayerTurn,
    state.gameState.isPlaying,
  ]);

  const handleSquareClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (isPlayerTurn || !isPlaying) {
        dispatch(clickSquare(position));
      }
    },
    [isPlaying, isPlayerTurn]
  );

  const selected = useMemo(() => {
    if (!selectedSquarePosition) return false;
    const id =
      board[selectedSquarePosition.i][selectedSquarePosition.j].stone!.id;

    return (
      whereStoneCanGo[id].includes(currentSquare.id) ||
      (position.i === selectedSquarePosition.i &&
        position.j === selectedSquarePosition.j)
    );
  }, [selectedSquarePosition, whereStoneCanGo]);

  return (
    <SquareItem
      color2={currentSquare.color}
      selected={selected}
      onClick={handleSquareClick}
    >
      {currentSquare.stone && (
        <Stone handleClick={handleSquareClick} stone={currentSquare.stone} />
      )}
    </SquareItem>
  );
};
export default Square;
