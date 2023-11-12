import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getFlightData } from "./flightBoardThunks.ts";
import { FlightTableItem } from "../../http";
import {
  Filters,
  TableParams,
} from "../../components/dataTable/DataTable.types.ts";
import { generateRandomString } from "../../utils/randomStringGenerator.ts";
import { getInitialFilters } from "../../components/dataTable/utils.ts";

interface State {
  data: FlightTableItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  updateTableKey: string;
  tableParams: TableParams;
  filterParams: Filters;
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
  updateTableKey: "",
  tableParams: initialTableParams,
  filterParams: getInitialFilters("flightBoard") as Filters,
};

export const flightBoardSlice = createSlice({
  name: "flightBoardData",
  initialState,
  reducers: {
    setTableParams: (state, action: PayloadAction<Partial<TableParams>>) => {
      Object.assign(state.tableParams, action.payload);
    },
    updateTable: (state) => {
      state.updateTableKey = generateRandomString(15);
    },
    setFilterParams: (state, action: PayloadAction<Partial<TableParams>>) => {
      Object.assign(state.filterParams, action.payload);
    },
    resetFilters: (state) => {
      Object.assign(state.filterParams, getInitialFilters("flightBoard"));
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
