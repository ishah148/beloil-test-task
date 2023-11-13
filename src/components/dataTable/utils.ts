import { flightBoardConfig } from "./columns/flightTableColumns.tsx";
import { ColumnConfig, Filters, TableNames } from "./DataTable.types.ts";
import { bookingBoardConfig } from "./columns/bookingTableColumns.tsx";

export function getInitialFilters(tableName: TableNames) {

  let columns: ColumnConfig[];
  if (tableName === "bookingBoard") {
    columns = bookingBoardConfig;
  }else if (tableName === "flightBoard") {
    columns = flightBoardConfig;
  }else {
    return {} as Filters
  }

  const entries: [string, Record<string, string>][] = columns
    .filter((col) => col.field && col.field !== "notes" && col.field !== "actions")
    .map((col) => {
      return [
        col.field as string,
        {
          value: "",
          matchMode: "contains",
        },
      ];
    });
  return Object.fromEntries(entries) as Filters;
}
