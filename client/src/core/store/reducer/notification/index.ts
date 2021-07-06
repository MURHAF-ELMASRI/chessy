import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionLessNotificationTypes } from "@type/ActionLessNotificationTypes";
import { ActionNotificationTypes } from "@type/ActionNotificationTypes";

interface InitialState {
  notificationType: ActionNotificationTypes | ActionLessNotificationTypes | "";
  content: string;
}

const initialState: InitialState = {
  notificationType: "",
  content: "",
};

//payload interface
type ActionNotificationPayload = ActionNotificationTypes;

interface ActionLessNotificationPayload {
  notificationType: ActionLessNotificationTypes;
  content: string;
}

const notificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    showActionNotification: (
      state,
      action: PayloadAction<ActionNotificationPayload>
    ) => {
      state.notificationType = action.payload;
    },
    showActionLessNotification: (
      state,
      action: PayloadAction<ActionLessNotificationPayload>
    ) => {
      state.notificationType = action.payload.notificationType;
      state.content = action.payload.content;
    },
    hideNotification: (state, action: PayloadAction<undefined>) => {
      state.notificationType = "";
      state.content = "";
    },
  },
});

export const {
  showActionNotification,
  showActionLessNotification,
  hideNotification,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
