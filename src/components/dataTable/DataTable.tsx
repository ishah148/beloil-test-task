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
import ActionBar from "../actionBar/ActionBar.tsx";

const columns = [
  {
    headerStyle: { width: "3rem" },
  },
  {
    field: "flight_id",
    header: "Name",
    sortable: true,
    style: { width: "20%" },
  },
  {
    field: "airline_name",
    sortable: true,
    header: "Рейс",
  },
  {
    field: "city",
    sortable: true,
    header: "Город(Аэропорт)",
  },
  {
    field: "departure_time",
    sortable: true,
    header: "Дата и время вылета",
  },
  {
    field: "checkin_time",
    sortable: true,
    header: "Регистрация (до)",
  },
  {
    field: "seat_capacity",
    sortable: true,
    header: "Кол-во мест",
  },
  {
    field: "notes",
    header: "Примечания",
  },
  {
    field: "actions",
    header: "Действия",
    body: () => (
      <ActionBar key={"city"} onEditClick={() => {}} onRemoveClick={() => {}} />
    ),
  },
];

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
        // filters={lazyState.filters}
        loading={loading}
        tableStyle={{ minWidth: "75rem" }}
        rowsPerPageOptions={[5, 10, 15]}
        // selection={selectedCustomers}
        // onSelectionChange={onSelectionChange}
        // selectAll={selectAll}
        // onSelectAllChange={onSelectAllChange}
      >
        {/*<Column headerStyle={{ width: "3rem" }} />*/}
        {/*<Column*/}
        {/*  field="flight_id"*/}
        {/*  header="Name"*/}
        {/*  sortable*/}
        {/*  style={{ width: "20%" }}*/}
        {/*/>*/}
        {/*<Column field="airline_name" sortable header="Рейс" />*/}
        {/*<Column*/}
        {/*  field="city"*/}
        {/*  sortable*/}
        {/*  header="Город(Аэропорт)"*/}
        {/*  // body={() => <ActionBar />}*/}
        {/*/>*/}
        {/*<Column field="departure_time" sortable header="Дата и время вылета" />*/}
        {/*<Column field="checkin_time" sortable header="Регистрация (до)" />*/}
        {/*<Column field="seat_capacity" sortable header="Кол-во мест" />*/}
        {/*<Column field="notes" header="Примечания" />*/}

        {columns.map((col) => {
          const { style, header, sortable, body, field, headerStyle } = col;
          return (
            <Column
              field={field}
              sortable={sortable}
              header={header}
              body={body}
              style={style}
              key={header}
            />
          );
        })}
      </DataTable>
    </div>
  );
}
