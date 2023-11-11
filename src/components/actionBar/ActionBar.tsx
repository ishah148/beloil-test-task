import "./ActionBar.scss";
import { Button } from "primereact/button";
import { FlightTableItem } from "../../http";
import {useEffect} from "react";

type Props = {
  onRemoveClick: () => void;
  onEditClick: () => void;
  isDeleteBtnLoading?: true;
  rowData: FlightTableItem;
};
const ActionBar = (props: Props) => {
  const { isDeleteBtnLoading, rowData, onRemoveClick, onEditClick } = props;
  useEffect(() => {
    console.log("rowData",rowData)
  }, []);
  return (
    <div className="action-bar-container">
      <Button className="p-button edit" onClick={onEditClick}>
        <i className="pi pi-user-edit"></i>
      </Button>
      <Button
        loading={isDeleteBtnLoading}
        className="p-button p-button-danger delete"
        onClick={onRemoveClick}
      >
        {!isDeleteBtnLoading && <i className="pi pi-trash"></i>}
      </Button>
    </div>
  );
};

export default ActionBar;
