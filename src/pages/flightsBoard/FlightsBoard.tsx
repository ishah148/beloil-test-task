import { FC, useEffect, useRef } from "react";

import "./FlightsBoard.scss";

import { SubmitHandler } from "react-hook-form";
import DataTable from "../../components/dataTable/DataTable.tsx";
import { Inputs } from "../../components/flightCreator/types.ts";

import TimeBoard from "../../components/timeboard/TimeBoard.tsx";
import FlightCreator from "../../components/flightCreator/FlightCreator.tsx";

import useFetcher from "../../hooks/useFetcher.tsx";
import { FlightTableItem } from "../../http";
import { FlightDataService } from "../../http/services/flights.ts";
import { useAppSelector } from "../../store";

const FlightsBoard: FC = () => {
  function onCloseFlightCreatorDialog() {
    // setIsDialogVisible(false);
  }

  const tableParams = useAppSelector((state) => state.flightBoard.tableParams);

  const onFlightCreatorSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit:data", data); // send to server!!!
  };

  const {
    data,
    getData: getFlightsData,
    loading,
    errorMsg,
  } = useFetcher<typeof FlightDataService.getFlightsData2, FlightTableItem[]>(
    FlightDataService.getFlightsData2,
  );

  useEffect(() => {
    (async () => {
      await getFlightsData();
    })();
  }, [tableParams]);

  return (
    <main>
      <TimeBoard />
      {/*<Sanbox />*/}
      <FlightCreator
        onCloseDialog={onCloseFlightCreatorDialog}
        onSubmit={onFlightCreatorSubmit}
      />
      <DataTable flights={data} loading={loading} />
    </main>
  );
};

export default FlightsBoard;
