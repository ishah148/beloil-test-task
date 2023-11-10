import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getFlightData } from "./flightBoardThunks.ts";
import { FlightTableItem } from "../../http";
import { TableParams } from "../../components/dataTable/DataTable.types.ts";

interface State {
  data: FlightTableItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  tableParams: TableParams;
}

const initialTableParams: TableParams = {
  first: 0,
  rows: 10,
  limit: 0,
  page: 1,
  pageCount: 10,
  totalRecords: 0,
  sortField: "",
  sortOrder: undefined,
};

const initialState: State = {
  data: [],
  loading: false,
  error: null,
  success: false,
  tableParams: initialTableParams,
};

export const flightBoardSlice = createSlice({
  name: "flightBoardData",
  initialState,
  reducers: {
    setTableParams: (state, action: PayloadAction<Partial<TableParams>>) => {
      Object.assign(state.tableParams, action.payload);
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

export const flightBoardSliceActions = flightBoardSlice.actions;

export default flightBoardSlice.reducer;
