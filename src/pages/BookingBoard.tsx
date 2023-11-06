import { FC } from "react";
import TimeBoard from "../components/timeboard/TimeBoard.tsx";
import DataTable from "../components/dataTable/DataTable.tsx";


const BookingBoard: FC = () => {
  return (
    <>
      <main>
        <TimeBoard />
        <DataTable />
      </main>
    </>
  );
};

export default BookingBoard;
