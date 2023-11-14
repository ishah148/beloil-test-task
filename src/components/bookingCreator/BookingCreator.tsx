import { useState } from "react";
import { validationRules } from "../../constants";
import { useForm } from "react-hook-form";

import useFetcher from "../../hooks/useFetcher.tsx";
import EditDialog from "../editDialog/EditDialog.tsx";

import { Button } from "primereact/button";
import { BookingFieldsNames } from "./types.ts";
import { BookingDataService } from "../../http/services/booking.ts";

type Props = {
  // isDialogVisible: boolean;
  onCloseDialog?: () => void;
};

const BookingCreator = (props: Props) => {
  const { requiredValidationRule, onlyStringValidationRule } = validationRules;
  const successText = "Бронь успешно завершено!";
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const { loading, sendReq } = useFetcher<typeof BookingDataService.create, unknown>(
    BookingDataService.create,
    true,
    successText,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: hookFormErrors },
  } = useForm<BookingFieldsNames>();

  const isSubmitBtnDisabled = Object.keys(hookFormErrors).length > 0 || loading;

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
            Имя
            <br />
            {hookFormErrors.first_name && (
              <span className="invalid-validation">
                {hookFormErrors.first_name.message}
              </span>
            )}
            <input
              {...register("first_name", {
                ...requiredValidationRule,
                ...onlyStringValidationRule,
              })}
              className="p-inputtext p-component"
              type={"text"}
            />
          </label>

          <label>
            Фамилия
            <br />
            {hookFormErrors.last_name && (
              <span className="invalid-validation">
                {hookFormErrors.last_name.message}
              </span>
            )}
            <input
              {...register("last_name", {
                ...requiredValidationRule,
              })}
              className="p-inputtext p-component"
              type={"text"}
            />
          </label>

          <label>
            Отчество
            <br />
            {hookFormErrors.surname && (
              <span className="invalid-validation">
                {hookFormErrors.surname.message}
              </span>
            )}
            <input
              className="p-inputtext p-component"
              {...register("surname", {
                ...requiredValidationRule,
                ...onlyStringValidationRule,
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

export default BookingCreator;
