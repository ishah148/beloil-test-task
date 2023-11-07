import { FC, useState } from "react";

import "./FlightsBoard.scss";
import TimeBoard from "../../components/timeboard/TimeBoard.tsx";
import EditDialog from "../../components/editDialog/EditDialog.tsx";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { useForm, SubmitHandler } from "react-hook-form";
import { Validator } from "../../utils/validator.ts";

type Inputs = {
  flightNo: string;
  airline: string;
  myVal: string;
  city: string;
  flightDate: string;
  registrationDate: string;
  seatsAmount: string;
  notes: string;
};

const defaultValues = {
  flightDate: new Date().toString(),
  registrationDate: new Date().toString(),
  notes:'hahaha'
};

const Main: FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors: hookFormErrors },
  } = useForm<Inputs>({defaultValues});

  const isSubmitBtnDisabled = Object.keys(hookFormErrors).length > 0;

  const requiredValidationRule = {
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
    console.log("data.date", new Date(data.flightDate).getTime());
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
          <label>
            Номер рейса
            <br />
            {hookFormErrors.flightNo && (
              <span className="invalid-validation">
                {hookFormErrors.flightNo.message}
              </span>
            )}
            <input
              {...register("flightNo", {
                ...requiredValidationRule,
              })}
              className="p-inputtext p-component"
              type={"text"}
            />
          </label>

          <label>
            Город (Аэропорт)
            <br />
            {hookFormErrors.city && (
              <span className="invalid-validation">
                {hookFormErrors.city.message}
              </span>
            )}
            <input
              {...register("city", {
                ...requiredValidationRule,
              })}
              className="p-inputtext p-component"
              type={"text"}
            />
          </label>

          <label>
            Дата и время вылета
            <br />
            {hookFormErrors.flightDate && (
              <span className="invalid-validation">
                {hookFormErrors.flightDate.message}
              </span>
            )}
            <input
              {...register("flightDate", {
                ...requiredValidationRule,
              })}
              className="p-inputtext p-component"
              type={"datetime-local"}
            />
          </label>

          <label>
            Авиакомпания
            <br />
            {hookFormErrors.airline && (
              <span className="invalid-validation">
                Обязательно для заполнения
              </span>
            )}
            <input
              className="p-inputtext p-component"
              {...register("airline", { ...requiredValidationRule })}
            />
          </label>

          <label>
            Дата и время регистрации
            <br />
            {hookFormErrors.registrationDate && (
              <span className="invalid-validation">
                {hookFormErrors.registrationDate.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              type={"datetime-local"}
              {...register("registrationDate", {
                ...requiredValidationRule,
                validate: () =>
                  Validator.validateRegisterDate(
                    getValues("registrationDate"),
                    getValues("flightDate"),
                  ),
              })}
            />
          </label>

          <label>
            Количество мест
            <br />
            {hookFormErrors.seatsAmount && (
              <span className="invalid-validation">
                {hookFormErrors.seatsAmount.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              {...register("seatsAmount", {
                ...requiredValidationRule,
                min: {
                  value: 1,
                  message: "Количество мест меньше 1",
                },
                max: {
                  value: 99,
                  message: "Количество мест превышает 99",
                },
              })}
            />
          </label>

          <label>
            Примечания
            <br />
            {hookFormErrors.notes && (
              <span className="invalid-validation">
                {hookFormErrors.notes.message}
              </span>
            )}
            <input className="p-inputtext p-component" {...register("notes")} />
          </label>

          <InputText
            type="submit"
            value="Создать"
            className={"p-button text-center"}
            disabled={isSubmitBtnDisabled}
          />
        </form>
      </EditDialog>
    </main>
  );
};

export default Main;
