import { dateFiltersNames } from "../constants";
import { Formatter } from "./timeHelper.ts";
import { Filters, TableParams } from "../components/dataTable/DataTable.types.ts";

const excludedTableParams = ["first", "totalRecords","pageCount"];

function getFilterQuery(params: Filters) {
  const newParams: Record<string, string> = {};

  for (const param in params) {
    const fieldName = param;
    let fieldValue = params[param].value;
    if (dateFiltersNames.includes(fieldName) && fieldValue) {
      fieldValue = Formatter.getTimeMS(fieldValue).toString();
    }
    if (fieldValue) {
      newParams[fieldName] = fieldValue?.trim?.();
    }
  }
  return newParams;
}

function getTableQuery(params: TableParams) {
  const newParams: Partial<any> = {};

  for (const param in params) {
    const fieldName = param as keyof TableParams;
    const fieldValue = params[fieldName];

    if (excludedTableParams.includes(fieldName as string)) {
      continue;
    }
    if (typeof fieldValue === "undefined") {
      continue;
    }
    newParams[fieldName] = fieldValue;
  }
  return newParams;
}

export function getQuery(tableParams: TableParams, filterParams: Filters) {
  return {
    ...getTableQuery(tableParams),
    ...getFilterQuery(filterParams),
  };
}
