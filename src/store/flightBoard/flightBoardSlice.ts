import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { FlightTableItem } from "../../http";


interface State {
  editorParams: Partial<FlightTableItem>;
}



const initialState: State = {
  editorParams: {},
};

export const flightBoardSlice = createSlice({
  name: "flightBoardData",
  initialState,
  reducers: {
    setEditParams: (state, action: PayloadAction<Partial<FlightTableItem>>) => {
      Object.assign(state.editorParams, action.payload);
    },
    resetEditParams: (state) => {
      state.editorParams = {};
    },
  },
});


export const flightBoardSliceActions = flightBoardSlice.actions;

export default flightBoardSlice.reducer;
