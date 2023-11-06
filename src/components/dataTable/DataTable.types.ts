import {DataTableFilterMeta} from "primereact/datatable";

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
  filters: DataTableFilterMeta;
}