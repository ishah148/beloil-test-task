import EditDialog from "../../ui/editDialog/EditDialog.tsx";
import { Validator } from "../../../utils/validator.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlightsEditFieldsNames } from "./types.ts";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import useFetcher from "../../../hooks/useFetcher.tsx";
import { FlightDataService } from "../../../services/flights.ts";
import { validationRules } from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../store";
import { isEmpty } from "../../../utils/common.ts";
import { flightBoardSliceActions } from "../../../store/flightBoard/flightBoardSlice.ts";
import { Formatter } from "../../../utils/timeHelper.ts";

type CellData = {
  flightId: string;
  checkinTime: string;
  departureTime: string;
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
    const { flightId, departureTime, checkinTime } = editorParams as CellData;
    setValue("flightId", flightId);
    setValue("departureTime", Formatter.getTimeYYYYMMDDTHHMM(departureTime));
    setValue("checkinTime", Formatter.getTimeYYYYMMDDTHHMM(checkinTime));
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
