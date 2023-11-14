import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { BookingTableItem } from "../../http";

interface State {
  editorParams: Partial<BookingTableItem>;
}

const initialState: State = {
  editorParams: {},
};

export const bookingBoardSlice = createSlice({
  name: "bookingBoardData",
  initialState,
  reducers: {
    setEditParams: (state, action: PayloadAction<Partial<BookingTableItem>>) => {
      Object.assign(state.editorParams, action.payload);
    },
    resetEditParams: (state) => {
      state.editorParams = {};
    },
  },
});

export const bookingBoardSliceActions = bookingBoardSlice.actions;

export default bookingBoardSlice.reducer;
