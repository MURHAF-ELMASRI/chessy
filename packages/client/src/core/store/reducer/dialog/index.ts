import { color } from "src/constants/color";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "src/types/Color";
import { DialogType } from "src/types/DialogTypes";
import { Position } from "src/types/Position";

interface InitialState {
  dialogType: DialogType | "";
  opponentColor: Color;
  opponentName: string;
  opponentUID: string;
  pawnPosition?: Position;
}

const initialState: InitialState = {
  dialogType: "",
  opponentName: "",
  opponentUID: "",
  opponentColor: color.white,
};

interface RequestPlay {
  opponentName: string;
  opponentColor: Color;
}

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showChooseStoneColorDialog: (
      state,
      action: PayloadAction<{ opponentUID: string }>
    ) => {
      state.opponentUID = action.payload.opponentUID;
      state.dialogType = "chooseStoneColor";
    },

    showReplacePawnDialog: (state, action: PayloadAction<Position>) => {
      state.dialogType = "replacePawn";
      state.pawnPosition = action.payload;
    },
    showRequestPlayDialog: (state, action: PayloadAction<RequestPlay>) => {
      state.dialogType = "requestPlay";
      state.opponentName = action.payload.opponentName;
      state.opponentColor = action.payload.opponentColor;
    },
    showCancelConfirmationDialog: (state, action: PayloadAction<undefined>) => {
      state.dialogType = "cancelConfirmation";
    },

    hideDialog: (state, action: PayloadAction<undefined>) => {
      state.dialogType = "";
      //TODO: save the stone after closing the dialog in some state
      // state.stone = action.payload;
    },
  },
});

export const {
  showChooseStoneColorDialog,
  showReplacePawnDialog,
  hideDialog,
  showCancelConfirmationDialog,
  showRequestPlayDialog,
} = dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
