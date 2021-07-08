import React, { useState, useEffect, memo, ReactEventHandler } from "react";
import styled from "styled-components";
import Square from "../../component/square/Square";
import boardClass from "@models/board";
import { color } from "@constants/color";
import { useAppSelector } from "@hooks/useAppSelector";
import { Position } from "@type/Position";
import { SquareID } from "@type/SquareID";
import { setLogs } from "@store/reducer/logs";
import store from "@store/store";
import { cloneDeep, isEmpty } from "lodash";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { sendLose, sendMove, setIsPlayerTurn } from "@store/reducer/gameState";
import { showReplacePawnDialog } from "@store/reducer/dialog";
import { Color } from "@type/Color";
import { DragDropContext } from "react-beautiful-dnd";
const Container = styled.div`
  width: 400px; //for phone with 300 screen
  height: 400px;
  display: flex;
  flex-wrap: wrap;
`;

//scan 8*8 cells   note this is for all board
function initWhereStoneCanGo(board: boardClass, playerColor: Color) {
  //initalizing stone position
  if (!board) return {};
  const initPos: { [key: number]: SquareID[] } = {};
  board.board.forEach((e, i) =>
    e.forEach((x, j) => {
      if (x.stone && x.stone.color === playerColor) {
        initPos[x.stone.id] = board.getAvailableSquare({ i, j });
      }
    })
  );
  return initPos;
}

//return list of one square where stone can go  note: this is for one square
// const squareToGo = (board, i, j) => {
//   return move[board[i][j].stone.type](
//     board,
//     board[i][j].stone.color,
//     Number(i),
//     Number(j)
//   );
// };

//if player choose to make flip between king and rook
function handleSpecialCases(board: boardClass, src: Position, dest: Position) {
  const movedStone = board.board[src.i][src.j].stone!;
  if (
    movedStone.type === "king" &&
    ((board.playerColor && src.j === 4) ||
      (!board.playerColor && src.j === 3)) &&
    (dest.j === 6 || dest.j === 1)
  ) {
    //removing rook from previous position
    const rook_dest_j = dest.j === 6 ? 5 : 2;
    const rook_src_j = dest.j === 6 ? 7 : 0;
    board.moveStone({ i: 7, j: rook_src_j }, { i: 7, j: rook_dest_j });
  }
}

function handleLog(board: boardClass, src: Position, dest: Position) {
  const srcSquare = board.board[src.i][src.j];
  const destSquare = board.board[dest.i][dest.j];
  if (!srcSquare.stone) return;

  store.dispatch(
    setLogs(
      `${srcSquare.stone.color ? "white" : "black"} ${
        srcSquare.stone.type
      } moved from ${srcSquare.id} to ${destSquare.id} ${
        destSquare.stone
          ? "killed " +
            (destSquare.stone.color ? "white " : "black ") +
            destSquare.stone.type
          : ""
      }`
    )
  );
}

//whereStoneCanGo save object of stones id
function Game() {
  const [isPlaying, isPlayerTurn, moveMessage, playerColor] = useAppSelector(
    (state) => [
      state.gameState.isPlaying,
      state.gameState.isPlayerTurn,
      state.gameState.moveMessage,
      state.gameState.playingColor,
    ]
  );
  const [board, setBoard] = useState<boardClass>(new boardClass(playerColor));
  const [selectedSquarePos, setSelectedSquarePos] = useState<Position>();
  const [selected, setSelected] = useState<HTMLElement>();
  const [whereStoneCanGo, setWhereStoneCanGo] = useState(
    initWhereStoneCanGo(board, playerColor)
  );

  const dispatch = useAppDispatch();

  //click on stone ==> activate set where stone can go && set Selected to the stone && set available square
  //reClick it ==> free selected and set border and background to none
  //click on the an available square then move make a move

  function isPlayerStone(position: Position) {
    const stone = board.board[position.i][position.j].stone;
    return (
      stone &&
      ((stone.id >= 16 && playerColor === color.black) ||
        (stone.id < 16 && playerColor === color.white))
    );
  }

  const handleClick = (position: Position) => {
    if (!selectedSquarePos) {
      if (isPlayerStone(position)) setSelectedSquarePos(position);
      return;
    }
    //I am not allowing to select square if it does not have stone
    const selectedSquare =
      board.board[selectedSquarePos.i][selectedSquarePos.j];

    const destinationSquare = board.board[position.i][position.j];

    if (
      !whereStoneCanGo[selectedSquare.stone!.id].includes(destinationSquare.id)
    ) {
      setSelectedSquarePos(undefined);
      return;
    }

    const newBoardState = cloneDeep(board);

    newBoardState.moveStone(selectedSquarePos, position);

    handleSpecialCases(newBoardState, selectedSquarePos, position);

    handleLog(newBoardState, selectedSquarePos, position);

    if (position.i === 0 && selectedSquare.stone!.type === "pawn") {
      dispatch(showReplacePawnDialog(position));
    }

    setBoard(newBoardState);
  };

  //connect with server logic
  useEffect(() => {
    if (moveMessage && !isPlayerTurn) {
      const { src, dest } = moveMessage;

      handleLog(
        board,
        { i: 7 - src.i, j: 7 - src.j },
        { i: 7 - dest.i, j: 7 - dest.j }
      );
      const newState = cloneDeep(board);
      newState.moveStone(
        { i: 7 - src.i, j: 7 - src.j },
        { i: 7 - dest.i, j: 7 - dest.j }
      );

      setBoard(newState);
      dispatch(setIsPlayerTurn(true));
    }
  }, [moveMessage]);

  // check if play lose
  useEffect(() => {
    if (isEmpty(whereStoneCanGo)) return;
    let c: boolean = true;
    for (const key in whereStoneCanGo) {
      const element = whereStoneCanGo[key];
      if (element.length !== 0) {
        c = false;
        break;
      }
    }
    if (c) {
      dispatch(sendLose());
      dispatch(setLogs("PLAYER ONE LOSS"));
    }
  }, [whereStoneCanGo]);

  useEffect(() => {
    if (isPlaying) {
      setBoard(new boardClass(playerColor));
    }
  }, [isPlaying]);

  useEffect(() => {
    setWhereStoneCanGo(initWhereStoneCanGo(board, playerColor));
  }, [board, isPlayerTurn]);

  return (
    <Container>
      {board.board &&
        board.board.map((e, i) =>
          e.map((e, j) => (
            <Square
              handleClick={handleClick}
              squareObject={e}
              selected={selectedSquarePos?.i === i && selectedSquarePos.j === j}
              position={{ i, j }}
            />
          ))
        )}
    </Container>
  );
}
export default memo(Game);
