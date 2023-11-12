import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type NotificationType = "error" | "success" | "info" | "warn" | undefined;
interface State {
  notificationText: string | null;
  type: "error" | "success" | "info" | "warn" | undefined;
}

const initialState: State = {
  notificationText: null,
  type: undefined,
};

export const notificationSlice = createSlice({
  name: "notificationData",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<State>) => {
      state.notificationText = action.payload.notificationText;
      state.type = action.payload.type;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const notificationSliceActions = notificationSlice.actions;

export default notificationSlice.reducer;
