import { FlightTableItem } from "../../../http";
import ActionBar from "../../actionBar/ActionBar.tsx";
import { ColumnFilterElementTemplateOptions } from "primereact/column";

const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  const value = options.value || "";
  return (
    <input
      type="date"
      className="p-inputtext p-component"
      value={value}
      onChange={(e) => {
        options.filterApplyCallback(e.target.value);
      }}
    />
  );
};
export const flightBoardColumns = [
  {
    headerStyle: { width: "3rem" },
  },
  {
    field: "flight_id",
    header: "Номер рейса",
    sortable: true,
    filter: true,
    filterPlaceholder: "Номер рейса",
  },
  {
    field: "city",
    sortable: true,
    header: "Город(Аэропорт)",
    filter: true,
    filterPlaceholder: "Город(Аэропорт)",
  },
  {
    field: "airline_name",
    sortable: true,
    header: "Авиакомпания",
    filter: true,
    filterPlaceholder: "Авиакомпания",
  },
  {
    field: "departure_time",
    sortable: true,
    header: "Дата и время вылета",
    filter: true,
    filterPlaceholder: "Дата и время вылета",
    dataType: "date",
    filterElement: dateFilterTemplate,
  },
  {
    field: "checkin_time",
    sortable: true,
    header: "Регистрация (до)",
    filter: true,
    filterPlaceholder: "Регистрация (до)",
    dataType: "date",
    filterElement: dateFilterTemplate,
  },
  {
    field: "seat_capacity",
    sortable: true,
    header: "Кол-во мест",
    filter: true,
    filterPlaceholder: "Кол-во мест",
  },
  {
    field: "notes",
    header: "Примечания",
  },
  {
    field: "actions",
    header: "Действия",
    body: (rowData: FlightTableItem) => (
      <ActionBar
        key={"city"}
        rowData={rowData}
        onEditClick={() => {}}
        onRemoveClick={() => {}}
      />
    ),
  },
];
