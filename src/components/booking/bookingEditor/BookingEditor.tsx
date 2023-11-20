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
  lastName: string;
  firstName: string;
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
    const { firstName, lastName, surname } = editorParams as CellData;
    setValue("firstName", firstName);
    setValue("lastName", lastName);
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
            {hookFormErrors.firstName && (
              <span className="invalid-validation">
                {hookFormErrors.firstName.message}
              </span>
            )}
            <input
              {...register("firstName", {
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
            {hookFormErrors.lastName && (
              <span className="invalid-validation">
                {hookFormErrors.lastName.message}
              </span>
            )}
            <input
              {...register("lastName", {
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
