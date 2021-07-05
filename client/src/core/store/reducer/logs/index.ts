import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  logs: string[];
}

const initialState: InitialState = {
  logs: [],
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
    },
    deleteLogs: (state, action: PayloadAction<undefined>) => {
      state.logs = [];
    },
  },
});

export const { setLogs } = logsSlice.actions;
export const logsReducer = logsSlice.reducer;
