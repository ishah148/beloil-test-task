import { FlightTableItem } from "../../../http";
import ActionBar from "../../actionBar/ActionBar.tsx";
import { dateFilterTemplate } from "../dateFilterTemplate.tsx";
import { ColumnConfig } from "../DataTable.types.ts";

export const bookingBoardConfig: ColumnConfig[] = [
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
    field: "first_name",
    sortable: true,
    header: "Имя",
    filter: true,
    filterPlaceholder: "Имя",
  },
  {
    field: "last_name",
    sortable: true,
    header: "Фамилия",
    filter: true,
    filterPlaceholder: "Фамилия",
  },
  {
    field: "surname",
    sortable: true,
    header: "Отчество",
    filter: true,
    filterPlaceholder: "Отчество",
  },

  {
    field: "booking_time",
    sortable: true,
    header: "Дата брони",
    filter: true,
    filterPlaceholder: "Дата брони",
    dataType: "date",
    filterElement: dateFilterTemplate,
  },
  {
    field: "seat_number",
    sortable: true,
    header: "Кол-во мест",
    filter: true,
    filterPlaceholder: "Номер места",
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