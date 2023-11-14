import {BookingTableItem, FlightTableItem} from "../../http";
import { ColumnFilterElementTemplateOptions } from "primereact/column";

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
