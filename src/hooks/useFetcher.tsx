/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { isAxiosError } from "axios";
import { isApiError } from "../http";

function useFetchData<T extends (...args: any[]) => any, D>(cb: any) {
  // type RemoveAxiosResponse<C extends AxiosResponse> = C extends AxiosResponse<infer T> ? T : any;
  // type ResultData = Subtract<RemoveAxiosResponse<Awaited<ReturnType<T>>>, ApiResponseError>;

  const [data, setData] = useState<D>([] as D);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function getData(...args: Parameters<T>) {
    setLoading(true);
    let response;
    try {
      response = await cb(args);
    } catch (e) {
      setErrorMsg(
        "Что-то пошло не так или проверьте правильность введенных дынных",
      );
      return;
    } finally {
      setLoading(false);
    }

    if (isAxiosError(response)) {
      console.log("responce", response);
    }

    if (isApiError(response?.data)) {
      setErrorMsg(response.data.error);
      return;
    }

    setData(response.data);
  }

  return {
    data,
    errorMsg,
    getData,
    loading,
  };
}

export default useFetchData;
