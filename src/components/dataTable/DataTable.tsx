import { useEffect } from "react";
import {
  DataTable,
  DataTableFilterMeta,
  DataTablePageEvent,
  DataTableSortEvent,
  DataTableStateEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";

import { FlightTableItem } from "../../http";
import { useAppDispatch, useAppSelector } from "../../store";
import { flightBoardSliceActions } from "../../store/flightBoard/flightBoardSlice.ts";
import { flightBoardColumns } from "./columns/flightTableColumns.tsx";
import { Button } from "primereact/button";

type Props = {
  flights: FlightTableItem[];
  loading: boolean;
};

export default function FlightsTable({ flights, loading }: Props) {
  const dispatch = useAppDispatch();
  const tableParams = useAppSelector((state) => state.flightBoard.tableParams);
  const filterParams = useAppSelector(
    (state) => state.flightBoard.filterParams,
  );

  useEffect(() => {
    console.log("tablepatams", tableParams);
  }, [tableParams]);

  const onPage = (event: DataTablePageEvent) => {
    console.log("onPage", event);
    const { page, pageCount, rows } = event;
    dispatch(flightBoardSliceActions.setTableParams({ page, rows, pageCount }));
  };

  const onSort = (event: DataTableSortEvent) => {
    console.log("onSort", event);
    const { sortOrder, sortField } = event;
    dispatch(flightBoardSliceActions.setTableParams({ sortOrder, sortField }));
  };
  const onFilter = (event: DataTableStateEvent) => {
    console.log("onFilter", event.filters);
    dispatch(flightBoardSliceActions.setFilterParams(event.filters));
  };

  const resetFilters = () => {
    dispatch(flightBoardSliceActions.resetFilters());
  };

  const applyFilters = () => {
    dispatch(flightBoardSliceActions.updateTable());
  };

  const tableHeader = (
    <>
      <div className="data-table-btns__container">
        <div className="data-table-btns__button">
          <Button
            icon="pi pi-refresh"
            severity="secondary"
            onClick={resetFilters}
          >
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
      <DataTable
        value={flights}
        lazy
        // filterDisplay="row"
        header={tableHeader}
        resizableColumns
        editMode="cell"
        dataKey="flight_id"
        paginator
        // first={lazyState.first}
        rows={tableParams.rows}
        totalRecords={tableParams.totalRecords + 100}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        filters={filterParams as DataTableFilterMeta}
        filterDisplay="row"
        sortField={tableParams.sortField}
        sortOrder={tableParams.sortOrder}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
        rowsPerPageOptions={[5, 10, 15]}
        emptyMessage="Данные отсуствуют"
      >
        {flightBoardColumns.map((col) => {
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
      </DataTable>
    </div>
  );
}
