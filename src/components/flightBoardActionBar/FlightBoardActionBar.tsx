import "./ActionBar.scss";
import { Button } from "primereact/button";
import { FlightTableItem } from "../../http";
import { flightBoardSliceActions } from "../../store/flightBoard/flightBoardSlice.ts";
import { useAppDispatch } from "../../store";
import useFetcher from "../../hooks/useFetcher.tsx";
import { dataTableSliceActions } from "../../store/dataTable/dataTableSlice.ts";
import {FlightDataService} from "../../http/services/flights.ts";

type Props = {
  isDeleteBtnLoading?: true;
  rowData: FlightTableItem;
};
function FlightBoardActionBar(props: Props) {
  const { isDeleteBtnLoading, rowData } = props;
  const dispatch = useAppDispatch();

  const {
    loading: isDeleteLoading = true,
    sendReq,
  } = useFetcher<typeof FlightDataService.delete, Record<string, string>>(
      FlightDataService.delete,
  );

  async function remove() {
    await sendReq(rowData.flight_id);
    dispatch(dataTableSliceActions.updateTable());
  }

  async function edit() {
    dispatch(flightBoardSliceActions.setEditParams(rowData));
  }

  return (
    <div className="action-bar-container">
      <Button className="p-button edit" onClick={edit}>
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
}

export default FlightBoardActionBar;