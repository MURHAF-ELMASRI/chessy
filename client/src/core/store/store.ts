import { configureStore } from "@reduxjs/toolkit";
import { notificationReducer } from "./reducer/notification";
import { dialogReducer } from "./reducer/dialog";
import { logsReducer } from "./reducer/logs";
import { gameStateReducer } from "./reducer/gameState";

const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    notification: notificationReducer,
    gameState: gameStateReducer,
    logs: logsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
