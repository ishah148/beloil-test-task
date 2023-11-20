import { FC, useEffect } from "react";

import TimeBoard from "../components/timeboard/TimeBoard.tsx";

import useFetcher from "../hooks/useFetcher.tsx";
import { FlightTableItem } from "../http";
import { FlightDataService } from "../services/flights.ts";
import { useAppSelector } from "../store";
import { Filters, TableParams } from "../components/dataTable/DataTable.types.ts";
import { getQuery } from "../utils/queryConverter.ts";
import FlightEditor from "../components/flights/flightEditor/FlightEditor.tsx";
import { flightBoardConfig } from "../components/dataTable/columns/flightTableColumns.tsx";
import DataTable from "../components/dataTable/DataTable.tsx";
import FlightCreator from "../components/flights/flightCreator/FlightCreator.tsx";

const FlightsBoard: FC = () => {
  const updateKey = useAppSelector((state) => state.dataTable.updateTableKey);
  const tableParams = useAppSelector((state) => state.dataTable.tableParams);
  const filterParams = useAppSelector((state) => state.dataTable.filterParams);

  const { data, sendReq, loading, headers } = useFetcher<
    typeof FlightDataService.getFlightsData2,
    FlightTableItem[]
  >(FlightDataService.getFlightsData2);

  console.log("headers", headers);

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
    <main>
      <TimeBoard />
      <FlightEditor />
      <FlightCreator />
      <DataTable<FlightTableItem>
        name={"flightBoard"}
        data={data}
        loading={loading}
        tableConfig={flightBoardConfig}
        totalRecords={headers?.["x-total-count"] || 10}
      />
    </main>
  );
};

export default FlightsBoard;
