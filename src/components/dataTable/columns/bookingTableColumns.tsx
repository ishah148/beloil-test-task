import { dateFilterTemplate } from "../dateFilterTemplate.tsx";
import { ColumnConfig } from "../DataTable.types.ts";
import BookingBoardActionBar from "../../booking/bookingBoardActionBar/BookingBoardActionBar.tsx";



export const bookingBoardConfig: ColumnConfig[] = [
  {
    headerStyle: { width: "3rem" },
  },
  {
    field: "flightId",
    header: "Номер рейса",
    sortable: true,
    filter: true,
    filterPlaceholder: "Номер рейса",
  },
  {
    field: "firstName",
    sortable: true,
    header: "Имя",
    filter: true,
    filterPlaceholder: "Имя",
  },
  {
    field: "lastName",
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
    field: "bookingTime",
    sortable: true,
    header: "Дата брони",
    filter: true,
    filterPlaceholder: "Дата брони",
    dataType: "date",
    filterElement: dateFilterTemplate,
  },
  {
    field: "seatNumber",
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
    body: (rowData) => (
      <BookingBoardActionBar
        key={"city"}
        rowData={rowData}
      />
    ),
  },
];
