import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { isApiError } from "../http";

type FetcherFunction<T> = (...args: unknown[]) => Promise<AxiosResponse<T>>;

function useFetcher<T>(fetcher: FetcherFunction<T>) {
  const [data, setData] = useState<T>([] as T);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function getData(url: string, config?: AxiosRequestConfig<T>) {
    setLoading(true);
    let response;
    try {
      response = await fetcher(url, config);
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

export default useFetcher;
