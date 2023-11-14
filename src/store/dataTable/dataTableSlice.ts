import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { BookingTableItem, FlightTableItem } from "../../http";
import { Filters, TableNames, TableParams } from "../../components/dataTable/DataTable.types.ts";
import { generateRandomString } from "../../utils/randomStringGenerator.ts";
import { getInitialFilters } from "../../components/dataTable/utils.ts";

interface State {
  name: TableNames
  data: FlightTableItem[] | BookingTableItem[];
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
  name:"" as TableNames,
  data: [],
  loading: false,
  error: null,
  success: false,
  updateTableKey: "",
  tableParams: initialTableParams,
  filterParams: {} as Filters,
};

export const dataTableSlice = createSlice({
  name: "dataTable",
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
      Object.assign(state.filterParams, getInitialFilters(state.name));
    },
  },
});


export const dataTableSliceActions = dataTableSlice.actions;

export default dataTableSlice.reducer;
