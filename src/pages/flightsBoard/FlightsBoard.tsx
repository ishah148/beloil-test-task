import { FC, useState } from "react";

import "./FlightsBoard.scss";
import TimeBoard from "../../components/timeboard/TimeBoard.tsx";
import EditDialog from "../../components/editDialog/EditDialog.tsx";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
  myVal: string;
  date: string;
};

const Main: FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors: hookFormErrors },
  } = useForm<Inputs>();

  const isSubmitBtnDisabled = Object.keys(hookFormErrors).length > 0;

  const requiredValidation = {
    required: {
      value: true,
      message: "Обязательно для заполнения",
    },
  };

  function onCloseDialog() {
    setIsDialogVisible(false);
    reset();
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data.date", new Date(data.date).getTime());
  };

  return (
    <main>
      <TimeBoard />

      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setIsDialogVisible(true)}
      />
      <EditDialog
        isModalVisible={isDialogVisible}
        onCancel={onCloseDialog}
        headerText="Добавление рейса"
      >
        <form className="dialog-form" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            placeholder="Номер рейса"
            defaultValue=""
            {...register("example")}
          />

          <label>
            Дата
            <br />
            {hookFormErrors.date && (
              <span className="invalid-validation">
                {hookFormErrors.date.message}
              </span>
            )}
            <input
              {...register("date", {
                ...requiredValidation,
              })}
              className="p-inputtext p-component"
              type={"datetime-local"}
            />
          </label>

          <label>
            exampleRequired
            <br />
            {hookFormErrors.exampleRequired && (
              <span className="invalid-validation">
                Обязательно для заполнения
              </span>
            )}
            <InputText {...register("exampleRequired", { required: true })} />
          </label>

          {hookFormErrors.myVal && (
            <span className="invalid-validation">
              {hookFormErrors.myVal.message}
            </span>
          )}
          <InputText
            {...register("myVal", {
              validate: (value, b) => {
                console.log("a", value);
                console.log("b", b);
                return value < 12 ? "value < 12" : true;
              },
            })}
          />

          <InputText
            type="submit"
            value="Создать"
            disabled={isSubmitBtnDisabled}
          />
        </form>
      </EditDialog>
    </main>
  );
};

export default Main;
