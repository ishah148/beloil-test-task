import { FC, useState } from "react";

import "./FlightsBoard.scss";
import TimeBoard from "../../components/timeboard/TimeBoard.tsx";
import EditDialog from "../../components/editDialog/EditDialog.tsx";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { SubmitHandler } from "react-hook-form";
import FlightCreator from "../../components/flightCreator/FlightCreator.tsx";
import { Inputs } from "../../components/flightCreator/types.ts";

const Main: FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  function onCloseDialog() {
    setIsDialogVisible(false);
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("onSubmit:data", data);
  };


  return (
    <main>
      <TimeBoard />

      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setIsDialogVisible(true)}
      />
      <FlightCreator
        isDialogVisible={isDialogVisible}
        onCloseDialog={onCloseDialog}
        onSubmit={onSubmit}
      />
    </main>
  );
};

export default Main;
