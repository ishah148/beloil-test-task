import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { BookingTableItem } from "../../http";
import { Filters, TableParams } from "../../components/dataTable/DataTable.types.ts";
import { generateRandomString } from "../../utils/randomStringGenerator.ts";
import { getInitialFilters } from "../../components/dataTable/utils.ts";

interface State {
  data: BookingTableItem[];
  loading: boolean;
  error: string | null;
  success: boolean;
  updateTableKey: string;
  tableParams: TableParams;
  filterParams: Filters;
  editorParams: Partial<BookingTableItem>;
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
  filterParams: getInitialFilters("bookingBoard") as Filters,
  editorParams: {},
};

export const bookingBoardSlice = createSlice({
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
