/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { isAxiosError } from "axios";
import { isApiError } from "../http";
import { useAppDispatch } from "../store";
import { notificationSliceActions } from "../store/notifications/notificationSlice.ts";

function useFetchData<T extends (...args: any[]) => any, D>(
  cb: any,
  showNotification: boolean = true,
  successMsg?: string,
) {
  // type RemoveAxiosResponse<C extends AxiosResponse> = C extends AxiosResponse<infer T> ? T : any;
  // type ResultData = Subtract<RemoveAxiosResponse<Awaited<ReturnType<T>>>, ApiResponseError>;

  const dispatch = useAppDispatch();

  const [data, setData] = useState<D>([] as D);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function sendReq(...args: Parameters<T>) {
    setLoading(true);
    let response;
    try {
      response = await cb(...args);
    } catch (e) {
      const msg =
        "Что-то пошло не так или проверьте правильность введенных дынных";
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

    setSuccessNotification()
    setData(response.data);
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
  };
}

export default useFetchData;
