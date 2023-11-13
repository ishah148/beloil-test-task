import { FC, useEffect } from "react";
import TimeBoard from "../components/timeboard/TimeBoard.tsx";

import { bookingBoardConfig } from "../components/dataTable/columns/bookingTableColumns.tsx";
import { useAppSelector } from "../store";
import useFetcher from "../hooks/useFetcher.tsx";

import { BookingTableItem } from "../http";
import { Filters, TableParams } from "../components/dataTable/DataTable.types.ts";
import { getQuery } from "../utils/queryConverter.ts";
import { BookingDataService } from "../http/services/booking.ts";
import MyDataTable from "../components/dataTable/MyDataTable.tsx";
// import BookingCreator from "../components/bookingCreator/BookingCreator.tsx";

const BookingBoard: FC = () => {
  const updateKey = useAppSelector((state) => state.flightBoard.updateTableKey);
  const tableParams = useAppSelector((state) => state.flightBoard.tableParams);
  const filterParams = useAppSelector((state) => state.flightBoard.filterParams);

  const { data, sendReq, loading } = useFetcher<
    typeof BookingDataService.getFlightsData2,
    BookingTableItem[]
  >(BookingDataService.getFlightsData2);

  useEffect(() => {
    getFlightData(tableParams, filterParams);
  }, [tableParams]);

  useEffect(() => {
    if (updateKey) {
      getFlightData(tableParams, filterParams);
    }
  }, [updateKey]);

  function getFlightData(tableParams: TableParams, filterParams: Filters) {
    (async () => {
      await sendReq(getQuery(tableParams, filterParams));
    })();
  }

  return (
    <>
      <main>
        <TimeBoard />
        {/*<BookingCreator/>*/}
        <MyDataTable<BookingTableItem>
          name={"bookingBoard"}
          data={data}
          loading={loading}
          tableConfig={bookingBoardConfig}
        />
      </main>
    </>
  );
};

export default BookingBoard;
