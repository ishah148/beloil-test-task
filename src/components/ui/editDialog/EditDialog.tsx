import React, { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

type Props = {
  onSubmit?: () => void;
  onCancel?: () => void;
  isModalVisible: boolean;
  headerText?: string;
  dialogFooterContent?: React.JSX.Element;
  showButtons?: boolean;
};
const EditDialog = ({ showButtons = false, ...props }: PropsWithChildren<Props>) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setIsModalVisible(props.isModalVisible);
  }, [props.isModalVisible]);

  function closeDialog() {
    props?.onCancel?.() || setIsModalVisible(false);
  }

  function submit() {
    props?.onSubmit?.();
  }

  const footerContent = props.dialogFooterContent || (
    <>
      {showButtons && (
        <>
          <Button
            label="Отмена"
            icon="pi pi-times"
            onClick={closeDialog}
            className="p-button-text"
          />
          <Button label="Применить" icon="pi pi-check" onClick={submit} autoFocus />
        </>
      )}
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header={props.headerText || "Header"}
        visible={isModalVisible}
        style={{ width: "auto" }}
        onHide={closeDialog}
        footer={footerContent}
        closeOnEscape
      >
        {props.children}
      </Dialog>
    </div>
  );
};

export default EditDialog;
