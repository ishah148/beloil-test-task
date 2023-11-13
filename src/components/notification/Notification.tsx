import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { notificationSliceActions } from "../../store/notifications/notificationSlice.ts";
const Notification = () => {
  const toast = useRef<Toast>(null);
  const dispatch = useAppDispatch();

  const { notificationText, type } = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (notificationText) {
      showWarn(notificationText, type);
      clear();
    }
  }, [notificationText, type]);
  const showWarn = (
    msg: string,
    type: "error" | "success" | "info" | "warn" | undefined,
  ) => {
    toast?.current?.show?.({
      severity: type,
      detail: msg,
      life: 5000,
    });
  };

  function clear() {
    dispatch(notificationSliceActions.reset());
  }

  return (
    <>
      <Toast ref={toast} />
    </>
  );
};

export default Notification;
