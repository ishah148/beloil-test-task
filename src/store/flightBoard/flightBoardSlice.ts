import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getFlightData } from "./flightBoardThunks.ts";
import { FlightTableItem } from "../../http";

interface State {
  value: number;
  data: FlightTableItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: State = {
  value: 120,
  data: [],
  loading: false,
  error: null,
  success: false,
};

const onPending = (state: State) => {
  state.loading = true;
  state.error = null;
  state.success = false;
};

const onFulfilled = (state: State) => {
  state.loading = false;
  state.success = true;
};

const onRejected = (
  state: State,
  payload: PayloadAction<string | undefined>,
) => {
  console.log("pay", payload);
  state.loading = false;
  state.success = false;
  state.error = payload.payload || "Произошла ошибка."; // todo constant
};

export const flightBoardSlice = createSlice({
  name: "flightBoardData",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<any>) => {
      console.log("act", action.payload);
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFlightData.pending, onPending);
    builder.addCase(
      getFlightData.fulfilled,
      (state, action: PayloadAction<FlightTableItem[]>) => {
        onFulfilled(state);
        state.data = action.payload;
      },
    );
    builder.addCase(getFlightData.rejected, onRejected);
  },
});

export const flightBoardSliceActions = flightBoardSlice.actions;

export default flightBoardSlice.reducer;
