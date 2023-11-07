import { FC } from "react";

import "./FlightsBoard.scss";
import TimeBoard from "../../components/timeboard/TimeBoard.tsx";

import { SubmitHandler } from "react-hook-form";
import FlightCreator from "../../components/flightCreator/FlightCreator.tsx";
import { Inputs } from "../../components/flightCreator/types.ts";
import DataTable from "../../components/dataTable/DataTable.tsx";

const Main: FC = () => {

  function onCloseFlightCreatorDialog() {
    // setIsDialogVisible(false);
  }

  const onFlightCreatorSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit:data", data); // send to server!!!
  };

  return (
    <main>
      <TimeBoard />
      <FlightCreator
        onCloseDialog={onCloseFlightCreatorDialog}
        onSubmit={onFlightCreatorSubmit}
      />
      <DataTable />

    </main>
  );
};

export default Main;
