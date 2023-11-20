import { FC, useEffect } from "react";
import TimeBoard from "../components/timeboard/TimeBoard.tsx";

import { bookingBoardConfig } from "../components/dataTable/columns/bookingTableColumns.tsx";
import { useAppSelector } from "../store";
import useFetcher from "../hooks/useFetcher.tsx";

import { BookingTableItem } from "../http";
import { Filters, TableParams } from "../components/dataTable/DataTable.types.ts";
import { getQuery } from "../utils/queryConverter.ts";
import { BookingDataService } from "../services/booking.ts";
import DataTable from "../components/dataTable/DataTable.tsx";
import BookingCreator from "../components/booking/bookingCreator/BookingCreator.tsx";
import BookingEditor from "../components/booking/bookingEditor/BookingEditor.tsx";

// import BookingCreator from "../components/bookingCreator/BookingCreator.tsx";

const BookingBoard = () => {
  const updateKey = useAppSelector((state) => state.dataTable.updateTableKey);
  const tableParams = useAppSelector((state) => state.dataTable.tableParams);
  const filterParams = useAppSelector((state) => state.dataTable.filterParams);

  const { data, sendReq, loading } = useFetcher<
    typeof BookingDataService.getFlightsData,
    BookingTableItem[]
  >(BookingDataService.getFlightsData);

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
        <BookingCreator />
        <BookingEditor />
        <DataTable<BookingTableItem>
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
