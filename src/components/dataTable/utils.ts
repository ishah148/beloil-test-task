import { flightBoardColumns } from "./columns/flightTableColumns.tsx";
import { Filters } from "./DataTable.types.ts";

export function getInitialFilters(tableName: "flightBoard" | "bookingBoard") {
  if (tableName === "flightBoard") {
    const entries: [string, Record<string, string>][] = flightBoardColumns
      .filter((col) => col.field && col.field !== "notes" && col.field !== 'actions')
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

  if (tableName === "bookingBoard") {
    return flightBoardColumns
      .filter((col) => col.field !== "notes")
      .map((col) => col.field) as any as Filters;;
  }
}
