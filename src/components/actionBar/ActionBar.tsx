import "./ActionBar.scss";
import { Button } from "primereact/button";

type Props = {
  onRemoveClick: () => void;
  onEditClick: () => void;
  isDeleteBtnLoading?: true;
};
const ActionBar = (props: Props) => {
  const { isDeleteBtnLoading, onRemoveClick, onEditClick } = props;
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
