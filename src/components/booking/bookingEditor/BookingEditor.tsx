import EditDialog from "../../ui/editDialog/EditDialog.tsx";

import { useForm } from "react-hook-form";

import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import useFetcher from "../../../hooks/useFetcher.tsx";

import { validationRules } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store";
import { isEmpty } from "../../../utils/common.ts";
import { BookingDataService } from "../../../services/booking.ts";
import { BookingFieldsNames } from "./types.ts";
import { bookingBoardSliceActions } from "../../../store/bookingBoard/bookingBoardSlice.ts";

type CellData = {
  last_name: string;
  first_name: string;
  surname: string;
};

const BookingEditor = () => {
  const { requiredValidationRule, onlyStringValidationRule } = validationRules;
  const successText = "Редактирование успешно завершено!";

  const dispatch = useAppDispatch();
  const editorParams = useAppSelector((state) => state.bookingBoard.editorParams);

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const { loading, sendReq } = useFetcher<typeof BookingDataService.edit, unknown>(
    BookingDataService.edit,
    true,
    successText,
  );

  function setDefaultValues() {
    const { first_name, last_name, surname } = editorParams as CellData;
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("surname", surname);
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors: hookFormErrors },
  } = useForm<BookingFieldsNames>();

  const isSubmitBtnDisabled = Object.keys(hookFormErrors).length > 0 || loading;

  function openDialog() {
    setIsDialogVisible(true);
  }

  function closeDialog() {
    reset();
    setIsDialogVisible(false);
    dispatch(bookingBoardSliceActions.resetEditParams());
  }

  const submit = handleSubmit(async (data) => {
    await sendReq(data);
  });

  useEffect(() => {
    console.log("editorParams",editorParams)
    if (!isEmpty(editorParams)) {
      dispatch(bookingBoardSliceActions.resetEditParams());
      openDialog();
    }
  }, [editorParams]);

  useEffect(() => {
    if (isEmpty(editorParams)) return;
    setDefaultValues();
  }, [editorParams]);

  return (
    <>
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

export default BookingEditor;
