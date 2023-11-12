import "./ActionBar.scss";
import { Button } from "primereact/button";
import { FlightTableItem } from "../../http";
import { useEffect } from "react";
import { flightBoardSliceActions } from "../../store/flightBoard/flightBoardSlice.ts";
import { useAppDispatch } from "../../store";
import useFetcher from "../../hooks/useFetcher.tsx";
import { FlightDataService } from "../../http/services/flights.ts";

type Props = {
  onRemoveClick: () => void;
  onEditClick: () => void;
  isDeleteBtnLoading?: true;
  rowData: FlightTableItem;
};
const ActionBar = (props: Props) => {
  const { isDeleteBtnLoading, rowData, onEditClick } = props;
  const dispatch = useAppDispatch();

  const {
    loading: isDeleteLoading = true,
    sendReq,
    errorMsg,
  } = useFetcher<typeof FlightDataService.delete, Record<string, string>>(
    FlightDataService.delete,
  );

  async function remove() {
    await sendReq(rowData.flight_id)
    dispatch(flightBoardSliceActions.updateTable());
  }

  useEffect(() => {
    // console.log("rowData", rowData);
  }, []);
  return (
    <div className="action-bar-container">
      <Button className="p-button edit" onClick={onEditClick}>
        <i className="pi pi-user-edit"></i>
      </Button>
      <Button
        loading={isDeleteLoading}
        className="p-button p-button-danger delete"
        onClick={remove}
        disabled={isDeleteBtnLoading}
      >
        {!isDeleteLoading && <i className="pi pi-trash"></i>}
      </Button>
    </div>
  );
};

export default ActionBar;
