import { dateFiltersNames } from "../constants";
import { Formatter } from "./timeHelper.ts";
import { Filters, TableParams } from "../components/dataTable/DataTable.types.ts";

export function getFilterQuery(params: Filters) {
  const newParams: Record<string, string> = {};

  for (const param in params) {
    const fieldName = param;
    let value = params[param].value;
    if (dateFiltersNames.includes(fieldName)) {
      value = Formatter.getTimeMS(value).toString();
    }
    newParams[fieldName] = value;
  }
  return newParams;
}

export function getTableQuery(params: TableParams) {
  return params;
}

export function getQuery(tableParams: TableParams, filterParams: Filters) {
  return {
    ...getTableQuery(tableParams),
    ...getFilterQuery(filterParams),
  };
}
