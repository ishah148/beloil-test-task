import EditDialog from "../../ui/editDialog/EditDialog.tsx";
import { Validator } from "../../../utils/validator.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { MouseEvent } from 'react';

import { Button } from "primereact/button";
import { useState } from "react";
import useFetcher from "../../../hooks/useFetcher.tsx";
import { FlightDataService } from "../../../services/flights.ts";
import { validationRules } from "../../../constants";
import { FlightsFieldsNames } from "./types.ts";

type Props = {
  // isDialogVisible: boolean;
  onCloseDialog?: () => void;
  onSubmit?: SubmitHandler<FlightsFieldsNames>;
  isLoading?: boolean;
};

const FlightCreator = (props: Props) => {
  const { requiredValidationRule, onlyStringValidationRule } = validationRules;
  const successText = "Создание рейса успешно завершено!";
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const { loading, sendReq } = useFetcher<typeof FlightDataService.create, unknown>(
    FlightDataService.create,
    true,
    successText,
  );

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors: hookFormErrors },
  } = useForm<FlightsFieldsNames>();

  const isSubmitBtnDisabled =
    Object.keys(hookFormErrors).length > 0 || props?.isLoading || loading;

  function openDialog() {
    setIsDialogVisible(true);
  }

  function closeDialog() {
    reset();
    setIsDialogVisible(false);
    props?.onCloseDialog?.();
  }

  function generate(e:  MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // const mock = {
    //   flightId: "SH-123",
    //   city: "Гомель",
    //   departureTime: "2023-11-20T14:55",
    //   airlineName: "Белавия",
    //   checkinTime: "2023-11-20T13:55",
    //   seatCapacity: "22",
    //   notes: "Можно без примечания",
    // };

    setValue("flightId", "SH-123");
    setValue("city", "Гомель");
    setValue("departureTime", "2023-11-20T14:55");
    setValue("airlineName", "Белавия");
    setValue("checkinTime", "2023-11-20T13:55");
    setValue("seatCapacity", "22");
    setValue("notes", "note");
  }

  const submit = handleSubmit(async (data) => {
    await sendReq(data);
  });

  return (
    <>
      <Button className="mb-5" onClick={openDialog}>
        <i className="pi pi-plus"></i>
      </Button>

      <EditDialog
        isModalVisible={isDialogVisible}
        onCancel={closeDialog}
        headerText="Добавление рейса"
      >
        <form
          className="dialog-form"
          // onSubmit={props.onSubmit && handleSubmit(props.onSubmit)}
          onSubmit={submit}
        >
          <label>
            Номер рейса
            <br />
            {hookFormErrors.flightId && (
              <span className="invalid-validation">
                {hookFormErrors.flightId.message}
              </span>
            )}
            <input
              {...register("flightId", {
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
                ...onlyStringValidationRule,
              })}
              className="p-inputtext p-component"
              type={"text"}
            />
          </label>
          <label>
            Дата и время вылета
            <br />
            {hookFormErrors.departureTime && (
              <span className="invalid-validation">
                {hookFormErrors.departureTime.message}
              </span>
            )}
            <input
              {...register("departureTime", {
                ...requiredValidationRule,
              })}
              className="p-inputtext p-component"
              type={"datetime-local"}
            />
          </label>
          <label>
            Авиакомпания
            <br />
            {hookFormErrors.airlineName && (
              <span className="invalid-validation">
                {hookFormErrors.airlineName.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              {...register("airlineName", {
                ...requiredValidationRule,
                ...onlyStringValidationRule,
              })}
            />
          </label>
          <label>
            Дата и время регистрации
            <br />
            {hookFormErrors.checkinTime && (
              <span className="invalid-validation">
                {hookFormErrors.checkinTime.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              type={"datetime-local"}
              {...register("checkinTime", {
                ...requiredValidationRule,
                validate: () =>
                  Validator.validateRegisterDate(
                    getValues("checkinTime"),
                    getValues("departureTime"),
                  ),
              })}
            />
          </label>
          <label>
            Количество мест
            <br />
            {hookFormErrors.seatCapacity && (
              <span className="invalid-validation">
                {hookFormErrors.seatCapacity.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              type={"number"}
              {...register("seatCapacity", {
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
          <Button
            className={"p-button text-center"}
            disabled={isSubmitBtnDisabled}
            loading={loading}
          >
            Создать
          </Button>

          <Button className={"p-button text-center ml-3"} onClick={(e) => generate(e)}>
            Сгенерировать
          </Button>
        </form>
      </EditDialog>
    </>
  );
};

export default FlightCreator;
