import { FC } from "react";
import TimeBoard from "../components/timeboard/TimeBoard.tsx";
import DataTable from "../components/dataTable/DataTable.tsx";
import FlightCreator from "../components/flightCreator/FlightCreator.tsx";

const BookingBoard: FC = () => {
  return (
    <>
      <main>
        <TimeBoard />
        <FlightCreator onCloseDialog={() => {}} onSubmit={() => {}} />
        <DataTable />
      </main>
    </>
  );
};

export default BookingBoard;
