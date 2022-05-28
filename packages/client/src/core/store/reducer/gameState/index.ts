import { color } from "src/constants/color";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "src/types/Color";
import { Move } from "src/types/Move";
import { gameConnection } from "src/core/services/gameConnection";
import boardClass from "src/core/models/board";
import { isPlayerStone } from "./isPlayerStone";
import { Position } from "src/types/Position";
import { SquareID } from "src/types/SquareID";
import { map } from "lodash";

interface startGameInterface {
  playingColor: Color;
  isPlayerTurn: boolean;
}
interface InitialState {
  isPlaying: boolean;
  playingColor: Color;
  isPlayerTurn: boolean;
  moveMessage?: Move;
  board: boardClass;
  selectedSquarePosition?: Position;
  whereStoneCanGo: { [key: number]: SquareID[] };
}
//TODO: optimization
const initialBoard = new boardClass(color.white);

const initialState: InitialState = {
  isPlaying: false,
  playingColor: color.white,
  isPlayerTurn: true,
  board: initialBoard,
  whereStoneCanGo: initialBoard.getWhereStoneCanGo(),
};

const gameStateSlice = createSlice({
  name: "GameState",
  initialState,
  reducers: {
    acceptGame: (state, action: PayloadAction<undefined>) => {
      gameConnection.sendMessageToServer({ msg: "accept-play" });
    },
    sendMove: (state, action: PayloadAction<Move>) => {
      gameConnection.sendMessageToServer({ msg: "move", move: action.payload });
    },
    rejectGame: (state, action: PayloadAction<undefined>) => {
      gameConnection.sendMessageToServer({ msg: "reject-play" });
    },
    requestPlay: (
      state,
      action: PayloadAction<{ opponentUID: string; playerColor: Color }>
    ) => {
      gameConnection.sendMessageToServer({
        msg: "request-play",
        opponentUID: action.payload.opponentUID,
        playerColor: action.payload.playerColor,
      });
    },
    setMoveMessage: (state, action: PayloadAction<Move>) => {
      state.moveMessage = action.payload;
    },
    sendLose: (state, action: PayloadAction<undefined>) => {
      gameConnection.sendMessageToServer({
        msg: "lose",
      });
    },
    sendCancelGame: (state, action: PayloadAction<undefined>) => {
      gameConnection.sendMessageToServer({
        msg: "cancel-game",
      });
    },
    reConnectServer: (state, action: PayloadAction<undefined>) => {
      gameConnection.connectServer();
    },
    disconnectWithServer: (state, action: PayloadAction<undefined>) => {
      gameConnection.closeConnection();
    },

    startGame: (state, action: PayloadAction<startGameInterface>) => {
      state.isPlaying = true;
      state.playingColor = action.payload.playingColor;
      state.isPlayerTurn = action.payload.isPlayerTurn;
    },
    changeTurn: (state, action: PayloadAction<undefined>) => {
      state.isPlayerTurn = !state.isPlayerTurn;
    },
    setBoard: (state, action: PayloadAction<{ color: Color }>) => {
      const newBoard = new boardClass(action.payload.color);
      state.board = newBoard;
      state.whereStoneCanGo = newBoard.getWhereStoneCanGo();
    },

    moveStone: (state, action: PayloadAction<Move>) => {
      state.board.moveStone(action.payload.src, action.payload.dest);
      state.whereStoneCanGo = state.board.getWhereStoneCanGo();
    },

    setStoneWhereCanGo: (state, action: PayloadAction<undefined>) => {
      state.whereStoneCanGo = state.board.getWhereStoneCanGo();
    },
    checkLose: (state, action: PayloadAction<undefined>) => {
      let shouldUserLose = true;
      map(state.whereStoneCanGo, (e) => {
        if (e.length !== 0) shouldUserLose = false;
      });
      if (shouldUserLose) {
        gameConnection.sendMessageToServer({ msg: "lose" });
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    clickSquare: (state, action: PayloadAction<Position>) => {
      const board = state.board.board;
      const playerColor = state.board.playerColor;
      const destinationPosition = action.payload;
      const selectedSquarePosition = state.selectedSquarePosition;
      if (isPlayerStone(board, destinationPosition, playerColor)) {
        state.selectedSquarePosition = destinationPosition;
        return;
      }
      if (!selectedSquarePosition) {
        return;
      }
      state.selectedSquarePosition = undefined;

      const selectedStoneID =
        board[selectedSquarePosition.i][selectedSquarePosition.j].stone?.id!;
      //handle move square
      const isAllowedToMove = state.whereStoneCanGo[selectedStoneID].includes(
        board[destinationPosition.i][destinationPosition.j].id
      );
      if (isAllowedToMove) {
        state.board.moveStone(selectedSquarePosition, destinationPosition);
        state.whereStoneCanGo = state.board.getWhereStoneCanGo();
        state.isPlayerTurn = !state.isPlayerTurn;
        gameConnection.sendMessageToServer({
          msg: "move",
          move: { src: selectedSquarePosition, dest: destinationPosition },
        });
      }
    },
  },
});

export const {
  disconnectWithServer,
  setIsPlaying,
  changeTurn,
  checkLose,
  startGame,
  acceptGame,
  sendMove,
  rejectGame,
  requestPlay,
  setMoveMessage,
  sendLose,
  sendCancelGame,
  reConnectServer,
  setBoard,
  moveStone,
  setStoneWhereCanGo,
  clickSquare,
} = gameStateSlice.actions;

export const gameStateReducer = gameStateSlice.reducer;
