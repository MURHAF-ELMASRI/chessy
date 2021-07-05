import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "@type/Color";
import { DialogType } from "@type/DialogTypes";

interface InitialState {
  dialogType: DialogType | "";
  name?: string;
  color?: Color;
  opponentName?: string;
}

const initialState: InitialState = {
  dialogType: "",
};

interface RequestPlay {
  opponentName: string;
  color: Color;
}

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showChooseStoneColorDialog: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.dialogType = "chooseStoneColor";
    },

    showReplacePawnDialog: (state, action: PayloadAction<undefined>) => {
      state.dialogType = "replacePawn";
    },
    showRequestPlayDialog: (state, action: PayloadAction<RequestPlay>) => {
      state.opponentName = action.payload.opponentName;
      state.color = action.payload.color;
    },

    hideDialog: (state, action: PayloadAction<undefined>) => {
      state.dialogType = "";
      //TODO: save the stone after closing the dialog in some state
      // state.stone = action.payload;
    },
  },
});

export const { showChooseStoneColorDialog, showReplacePawnDialog, hideDialog } =
  dialogSlice.actions;
export const dialogReducer = dialogSlice.reducer;
