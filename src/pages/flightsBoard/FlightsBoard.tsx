import { FC, useEffect } from "react";

import "./FlightsBoard.scss";

import TimeBoard from "../../components/timeboard/TimeBoard.tsx";


import useFetcher from "../../hooks/useFetcher.tsx";
import { FlightTableItem } from "../../http";
import { FlightDataService } from "../../http/services/flights.ts";
import { useAppSelector } from "../../store";
import { Filters, TableParams } from "../../components/dataTable/DataTable.types.ts";
import { getQuery } from "../../utils/queryConverter.ts";
import FlightEditor from "../../components/flightEditor/FlightEditor.tsx";
import { flightBoardConfig } from "../../components/dataTable/columns/flightTableColumns.tsx";
import MyDataTable from "../../components/dataTable/MyDataTable.tsx";
import FlightCreator from "../../components/flightCreator/FlightCreator.tsx";

const FlightsBoard: FC = () => {
  const updateKey = useAppSelector((state) => state.flightBoard.updateTableKey);
  const tableParams = useAppSelector((state) => state.flightBoard.tableParams);
  const filterParams = useAppSelector((state) => state.flightBoard.filterParams);

  const { data, sendReq, loading } = useFetcher<
    typeof FlightDataService.getFlightsData2,
    FlightTableItem[]
  >(FlightDataService.getFlightsData2);

  useEffect(() => {

  }, []);

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
      <MyDataTable<FlightTableItem>
        name={"flightBoard"}
        data={data}
        loading={loading}
        tableConfig={flightBoardConfig}
      />
    </main>
  );
};

export default FlightsBoard;
