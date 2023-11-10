import { FC } from "react";

import "./FlightsBoard.scss";

import { SubmitHandler } from "react-hook-form";
import DataTable from "../../components/dataTable/DataTable.tsx";
import { Inputs } from "../../components/flightCreator/types.ts";

import TimeBoard from "../../components/timeboard/TimeBoard.tsx";
import FlightCreator from "../../components/flightCreator/FlightCreator.tsx";
import Sanbox from "../Sanbox.tsx";

const FlightsBoard: FC = () => {
  function onCloseFlightCreatorDialog() {
    // setIsDialogVisible(false);
  }

  const onFlightCreatorSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit:data", data); // send to server!!!
  };

  return (
    <main>
      <TimeBoard />
      <Sanbox />
      <FlightCreator
        onCloseDialog={onCloseFlightCreatorDialog}
        onSubmit={onFlightCreatorSubmit}
      />
      <DataTable />
    </main>
  );
};

export default FlightsBoard;
