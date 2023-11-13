import { FC, useEffect } from "react";

import "./FlightsBoard.scss";
import DataTable from "../../components/dataTable/DataTable.tsx";

import TimeBoard from "../../components/timeboard/TimeBoard.tsx";
import FlightCreator from "../../components/flightCreator/FlightCreator.tsx";

import useFetcher from "../../hooks/useFetcher.tsx";
import { FlightTableItem } from "../../http";
import { FlightDataService } from "../../http/services/flights.ts";
import { useAppSelector } from "../../store";
import { Filters, TableParams } from "../../components/dataTable/DataTable.types.ts";
import { getQuery } from "../../utils/queryConverter.ts";
import { isEmpty } from "../../utils/common.ts";
import { flightBoardSliceActions } from "../../store/flightBoard/flightBoardSlice.ts";
import FlightEditor from "../../components/flightEditor/FlightEditor.tsx";

const FlightsBoard: FC = () => {
  // function onCloseFlightCreatorDialog() {
  //   // setIsDialogVisible(false);
  // }

  const tableParams = useAppSelector((state) => state.flightBoard.tableParams);
  const filterParams = useAppSelector((state) => state.flightBoard.filterParams);
  const editParams = useAppSelector((state) => state.flightBoard.editorParams);
  const updateKey = useAppSelector((state) => state.flightBoard.updateTableKey);

  // const onFlightCreatorSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log("onSubmit:data", data); // send to server!!!
  // };

  const { data, sendReq, loading } = useFetcher<
    typeof FlightDataService.getFlightsData2,
    FlightTableItem[]
  >(FlightDataService.getFlightsData2);

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
      <DataTable flights={data} loading={loading} />
    </main>
  );
};

export default FlightsBoard;
