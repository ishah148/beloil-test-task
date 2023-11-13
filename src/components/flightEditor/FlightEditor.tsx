import EditDialog from "../editDialog/EditDialog.tsx";
import { Validator } from "../../utils/validator.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlightsEditFieldsNames } from "./types.ts";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import useFetcher from "../../hooks/useFetcher.tsx";
import { FlightDataService } from "../../http/services/flights.ts";
import { validationRules } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store";
import { isEmpty } from "../../utils/common.ts";
import { flightBoardSliceActions } from "../../store/flightBoard/flightBoardSlice.ts";

type CellData = {
  flight_id: string;
  checkin_time: string;
  departure_time: string;
};

type Props = {
  // isDialogVisible: boolean;
  onCloseDialog?: () => void;
  onSubmit?: SubmitHandler<FlightsEditFieldsNames>;
  isLoading?: boolean;
};

const FlightEditor = (props: Props) => {
  const { requiredValidationRule } = validationRules;
  const successText = "Редактирование успешно завершено!";

  const dispatch = useAppDispatch();
  const editorParams = useAppSelector((state) => state.flightBoard.editorParams);

  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);

  const { loading, sendReq } = useFetcher<typeof FlightDataService.edit, unknown>(
    FlightDataService.edit,
    true,
    successText,
  );

  function setDefaultValues() {
    const { flight_id, departure_time, checkin_time } = editorParams as CellData;
    setValue("flight_id", flight_id);
    setValue("departure_time", departure_time);
    setValue("checkin_time", checkin_time);
  }

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors: hookFormErrors },
  } = useForm<FlightsEditFieldsNames>();

  const isSubmitBtnDisabled =
    Object.keys(hookFormErrors).length > 0 || props?.isLoading || loading;

  function openDialog() {
    setIsDialogVisible(true);
  }

  function closeDialog() {
    reset();
    setIsDialogVisible(false);
    dispatch(flightBoardSliceActions.resetEditParams());
    props?.onCloseDialog?.();
  }

  const submit = handleSubmit(async (data) => {
    await sendReq(data);
  });

  useEffect(() => {
    if (!isEmpty(editorParams)) {
      dispatch(flightBoardSliceActions.resetEditParams());
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

export default FlightEditor;
