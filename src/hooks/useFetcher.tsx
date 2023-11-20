import { useState } from "react";
import { AxiosResponse, isAxiosError } from "axios";
import { isApiError } from "../http";
import { useAppDispatch } from "../store";
import { notificationSliceActions } from "../store/notifications/notificationSlice.ts";
import { FunctionCb } from "../index.ts";

function useFetchData<T extends FunctionCb, D>(
  // eslint-disable-next-line
  cb: any,
  showNotification: boolean = true,
  successMsg?: string,
) {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<D>([] as D);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState<AxiosResponse["headers"]>();

  async function sendReq(...args: Parameters<T>[] | Parameters<T>) {
    setLoading(true);
    let response: AxiosResponse;
    try {
      response = await cb(...args);
    } catch (e) {
      const msg = "Что-то пошло не так или проверьте правильность введенных дынных";
      if (isAxiosError(e) && !e?.response?.data) {
        setErrorNotification(JSON.stringify(e.message));
        return;
      }
      setErrorNotification(msg);
      setErrorMsg(msg);
      return;
    } finally {
      setLoading(false);
    }

    if (isAxiosError(response)) {
      setErrorNotification(JSON.stringify(response.message));
      return;
    }

    if (isApiError(response?.data)) {
      setErrorMsg(response.data.error);
      return;
    }

    setSuccessNotification();
    setData(response.data);
    setHeaders(response.headers);
  }

  function setErrorNotification(msg: string) {
    if (showNotification) {
      dispatch(
        notificationSliceActions.setNotification({
          notificationText: msg,
          type: "error",
        }),
      );
    }
  }

  function setSuccessNotification() {
    if (showNotification && successMsg) {
      dispatch(
        notificationSliceActions.setNotification({
          notificationText: successMsg,
          type: "success",
        }),
      );
    }
  }

  return {
    data,
    errorMsg,
    sendReq,
    loading,
    headers,
  };
}

export default useFetchData;
