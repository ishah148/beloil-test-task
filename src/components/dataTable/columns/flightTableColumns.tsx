import {FlightTableItem} from "../../../http";
import ActionBar from "../../actionBar/ActionBar.tsx";

export const columns = [
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
    body: (rowData: FlightTableItem) => (
        <ActionBar key={"city"} rowData={rowData} onEditClick={() => {}} onRemoveClick={() => {}} />
    ),
  },
];