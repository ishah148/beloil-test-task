import { useEffect } from "react";
import {
  DataTable as PrimeDataTable,
  DataTableFilterMeta,
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableStateEvent,
  DataTableValue,
} from "primereact/datatable";
import { Column } from "primereact/column";

import { useAppDispatch, useAppSelector } from "../../store";

import { Button } from "primereact/button";
import { ColumnConfig, TableNames } from "./DataTable.types.ts";
import { getInitialFilters } from "./utils.ts";
import {dataTableSliceActions} from "../../store/dataTable/dataTableSlice.ts";

type Props<T> = {
  data: T[];
  loading: boolean;
  onEdit?: (editData: Record<string, string>) => void;
  tableConfig: ColumnConfig[];
  name: TableNames;
};

export default function DataTable<T extends DataTableValue>({
  data,
  loading,
  tableConfig,
  name,
}: Props<T>) {
  const dispatch = useAppDispatch();
  const tableParams = useAppSelector((state) => state.dataTable.tableParams);
  const filterParams = useAppSelector((state) => state.dataTable.filterParams);

  useEffect(() => {
    resetFilters();
    dispatch(dataTableSliceActions.setFilterParams(getInitialFilters(name)));
  }, []);

  const onPage = (event: DataTablePageEvent) => {
    const { page, pageCount, rows } = event;
    dispatch(dataTableSliceActions.setTableParams({ page, rows, pageCount }));
  };

  const onSort = (event: DataTableSortEvent) => {
    const { sortOrder, sortField } = event;
    dispatch(dataTableSliceActions.setTableParams({ sortOrder, sortField }));
  };
  const onFilter = (event: DataTableStateEvent) => {
    dispatch(dataTableSliceActions.setFilterParams(event.filters));
  };

  const resetFilters = () => {
    dispatch(dataTableSliceActions.resetFilters());
  };

  const applyFilters = () => {
    dispatch(dataTableSliceActions.updateTable());
  };

  const tableHeader = (
    <>
      <div className="data-table-btns__container">
        <div className="data-table-btns__button">
          <Button icon="pi pi-refresh" severity="secondary" onClick={resetFilters}>
            Сброс
          </Button>
        </div>
        <div className="data-table-btns__button">
          <Button icon="pi pi-check" severity="success" onClick={applyFilters}>
            Применить
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="card">
      <PrimeDataTable
        value={data}
        lazy
        header={tableHeader}
        // resizableColumns
        dataKey="flight_id"
        paginator
        first={tableParams.first}
        rows={tableParams.rows}
        totalRecords={tableParams.totalRecords + 100}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        filters={filterParams as DataTableFilterMeta}
        globalFilter={null}
        filterDisplay="row"
        sortField={tableParams.sortField}
        sortOrder={tableParams.sortOrder}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
        rowsPerPageOptions={[5, 10, 15]}
        emptyMessage="Данные отсуствуют"
      >
        {tableConfig.map((col) => {
          return (
            <Column
              field={col.field}
              sortable={col.sortable}
              header={col.header}
              body={col.body}
              // style={col.style}
              key={col.header + "-key"}
              headerStyle={col.headerStyle}
              filter={col.filter}
              filterPlaceholder={col.filterPlaceholder}
              dataType={col.dataType}
              // filterElement={col?.filterElement && dateFilterTemplate}
              filterElement={col?.filterElement}
              showFilterMenu={false}
              // filterField={"date"}
            />
          );
        })}
      </PrimeDataTable>
    </div>
  );
}
