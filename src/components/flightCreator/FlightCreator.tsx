import EditDialog from "../editDialog/EditDialog.tsx";
import { Validator } from "../../utils/validator.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlightsFieldsNames } from "./types.ts";
import { Button } from "primereact/button";
import { useState } from "react";
import useFetcher from "../../hooks/useFetcher.tsx";
import { FlightDataService } from "../../http/services/flights.ts";
import { validationRules } from "../../constants";

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
            {hookFormErrors.flight_id && (
              <span className="invalid-validation">
                {hookFormErrors.flight_id.message}
              </span>
            )}
            <input
              {...register("flight_id", {
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
            {hookFormErrors.departure_time && (
              <span className="invalid-validation">
                {hookFormErrors.departure_time.message}
              </span>
            )}
            <input
              {...register("departure_time", {
                ...requiredValidationRule,
              })}
              className="p-inputtext p-component"
              type={"datetime-local"}
            />
          </label>

          <label>
            Авиакомпания
            <br />
            {hookFormErrors.airline_name && (
              <span className="invalid-validation">
                {hookFormErrors.airline_name.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              {...register("airline_name", {
                ...requiredValidationRule,
                ...onlyStringValidationRule,
              })}
            />
          </label>

          <label>
            Дата и время регистрации
            <br />
            {hookFormErrors.checkin_time && (
              <span className="invalid-validation">
                {hookFormErrors.checkin_time.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              type={"datetime-local"}
              {...register("checkin_time", {
                ...requiredValidationRule,
                validate: () =>
                  Validator.validateRegisterDate(
                    getValues("checkin_time"),
                    getValues("departure_time"),
                  ),
              })}
            />
          </label>

          <label>
            Количество мест
            <br />
            {hookFormErrors.seat_capacity && (
              <span className="invalid-validation">
                {hookFormErrors.seat_capacity.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              type={"number"}
              {...register("seat_capacity", {
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
        </form>
      </EditDialog>
    </>
  );
};

export default FlightCreator;
