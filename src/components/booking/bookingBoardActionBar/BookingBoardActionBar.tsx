import { Button } from "primereact/button";
import {BookingTableItem, FlightTableItem} from "../../../http";
import { useAppDispatch } from "../../../store";
import useFetcher from "../../../hooks/useFetcher.tsx";
import { dataTableSliceActions } from "../../../store/dataTable/dataTableSlice.ts";

import { bookingBoardSliceActions } from "../../../store/bookingBoard/bookingBoardSlice.ts";
import { BookingDataService } from "../../../services/booking.ts";

type Props = {
  isDeleteBtnLoading?: true;
  rowData: FlightTableItem | BookingTableItem;
};
function BookingBoardActionBar(props: Props) {
  const { isDeleteBtnLoading, rowData } = props;
  const dispatch = useAppDispatch();

  const { loading: isDeleteLoading = true, sendReq } = useFetcher<
    typeof BookingDataService.delete,
    Record<string, string>
  >(BookingDataService.delete);

  async function remove() {
    await sendReq(rowData.flight_id);
    dispatch(dataTableSliceActions.updateTable());
  }

  async function edit() {
    console.log("edit",rowData)
    dispatch(bookingBoardSliceActions.setEditParams(rowData));
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

export default BookingBoardActionBar;
