import {BookingTableItem, FlightTableItem} from "../../http";
import { ColumnFilterElementTemplateOptions } from "primereact/column";

export interface Country {
  name: string;
  code: string;
}

export interface Representative {
  name: string;
  code: string;
}

export interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

export interface LazyTableState {
  first: number;
  rows: number;
  page: number;
  sortField?: string | undefined;
  sortOrder?: number | undefined;
}

export type Filters = {
  [key: string]: {
    value: string;
    matchMode: string | "contains";
  };
};

export interface TableParams {
  sortOrder: 0 | 1 | -1 | null | undefined;
  sortField: string;
  page: number;
  rows: number;
  first: number;
  limit: number;
  totalRecords: number;
  pageCount: number;
}

export interface ColumnConfig {
  headerStyle?: { width: string };
  field?: string;
  header?: string;
  sortable?: boolean;
  filter?: boolean;
  filterPlaceholder?: string;
  dataType?: string;
  body?: (rowData: FlightTableItem | BookingTableItem) => JSX.Element;
  filterElement?: (options: ColumnFilterElementTemplateOptions) => JSX.Element;
}

export type TableNames = "flightBoard" | "bookingBoard"
