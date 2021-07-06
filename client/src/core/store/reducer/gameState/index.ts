import { color } from "@constants/color";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "@type/Color";
import { Move } from "@type/Move";
import { gameConnection } from "@services/gameConnection";

interface InitialState {
  isPlaying: boolean;
  playingColor: Color;
  isPlayerTurn: boolean;
}

const initialState: InitialState = {
  isPlaying: false,
  playingColor: color.white,
  isPlayerTurn: true,
};

const gameStateSlice = createSlice({
  name: "GameState",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setPlayingColor: (state, action: PayloadAction<Color>) => {
      state.playingColor = action.payload;
    },
    setIsPlayerTurn: (state, action: PayloadAction<boolean>) => {
      state.isPlayerTurn = action.payload;
    },
    acceptGame: (state, action: PayloadAction<undefined>) => {
      gameConnection.sendMessageToServer({ msg: "accept-play" });
    },
    sendMove: (state, action: PayloadAction<Move>) => {
      gameConnection.sendMessageToServer({ msg: "move", move: action.payload });
    },
    rejectGame: (state, action: PayloadAction<undefined>) => {
      gameConnection.sendMessageToServer({ msg: "reject-game" });
    },
    requestPlay: (
      state,
      action: PayloadAction<{ opponentUID: string; color: Color }>
    ) => {
      gameConnection.sendMessageToServer({
        msg: "request-play",
        opponentUID: action.payload.opponentUID,
        color: action.payload.color,
      });
    },
  },
});

export const {
  setIsPlaying,
  setPlayingColor,
  setIsPlayerTurn,
  acceptGame,
  sendMove,
  rejectGame,
  requestPlay,
} = gameStateSlice.actions;
export const gameStateReducer = gameStateSlice.reducer;
