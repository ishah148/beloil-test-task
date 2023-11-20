import FlightBoardActionBar from "../../flights/flightBoardActionBar/FlightBoardActionBar.tsx";
import { dateFilterTemplate } from "../dateFilterTemplate.tsx";
import { ColumnConfig } from "../DataTable.types.ts";
import { Formatter } from "../../../utils/timeHelper.ts";
import { FlightTableItem } from "../../../http";

export const flightBoardConfig: ColumnConfig[] = [
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
    field: "city",
    sortable: true,
    header: "Город(Аэропорт)",
    filter: true,
    filterPlaceholder: "Город(Аэропорт)",
  },
  {
    field: "airlineName",
    sortable: true,
    header: "Авиакомпания",
    filter: true,
    filterPlaceholder: "Авиакомпания",
  },
  {
    field: "departureTime",
    sortable: true,
    header: "Дата и время вылета",
    filter: true,
    filterPlaceholder: "Дата и время вылета",
    dataType: "date",
    filterElement: dateFilterTemplate,
    body: (rowData) => (
      <p>
        {Formatter.getReadableDataWithTime(
          (rowData as FlightTableItem)?.departureTime,
        )}
      </p>
    ),
  },
  {
    field: "checkinTime",
    sortable: true,
    header: "Регистрация (до)",
    filter: true,
    filterPlaceholder: "Регистрация (до)",
    dataType: "date",
    filterElement: dateFilterTemplate,
    body: (rowData) => (
        <p>
          {Formatter.getReadableDataWithTime(
              (rowData as FlightTableItem)?.departureTime,
          )}
        </p>
    ),
  },
  {
    field: "seatCapacity",
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
    body: (rowData) => <FlightBoardActionBar key={"city"} rowData={rowData} />,
  },
];
