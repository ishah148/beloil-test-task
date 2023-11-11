import { useEffect } from "react";
import {
  DataTable,
  DataTablePageEvent,
  DataTableSortEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";

import { FlightTableItem } from "../../http";
import { useAppDispatch, useAppSelector } from "../../store";
import { flightBoardSliceActions } from "../../store/flightBoard/flightBoardSlice.ts";
import {columns} from "./columns/flightTableColumns.tsx";

type Props = {
  flights: FlightTableItem[];
  loading: boolean;
};

export default function FlightsTable({ flights, loading }: Props) {
  const dispatch = useAppDispatch();
  const tableParams = useAppSelector((state) => state.flightBoard.tableParams);

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

  return (
    <div className="card">
      <DataTable
        value={flights}
        lazy
        // filterDisplay="row"
        // onFilter={onFilter}
        resizableColumns
        editMode="cell"
        dataKey="flight_id"
        paginator
        // first={lazyState.first}
        rows={tableParams.rows}
        totalRecords={tableParams.totalRecords + 100}
        onPage={onPage}
        onSort={onSort}
        sortField={tableParams.sortField}
        sortOrder={tableParams.sortOrder}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
        rowsPerPageOptions={[5, 10, 15]}
      >

        {columns.map((col) => {
          const { style, header, sortable, body, field, headerStyle } = col;
          return (
            <Column
              field={field}
              sortable={sortable}
              header={header}
              body={body}
              style={style}
              key={header + '-key'}
              headerStyle={headerStyle}
            />
          );
        })}
      </DataTable>
    </div>
  );
}
