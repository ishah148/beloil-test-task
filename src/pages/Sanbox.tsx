import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { getFlightData } from "../store/flightBoard/flightBoardThunks.ts";
import {
  ApiResponseError,
  FlightTableItem,
} from "../http/services/mockData.ts";
import { FlightDataService } from "../http/services/tableData.ts";
import useFetcher from "../hooks/useFetcher.tsx";
import axios from "axios";

const Sanbox: FC = () => {
  const { data, error, loading, success } = useAppSelector(
    (state) => state.flightBoard,
  );
  const dispatch = useAppDispatch();

  const { data: data2, getData, loading:loading2, errorMsg } = useFetcher<
    ApiResponseError | FlightTableItem[]
  >(axios.get as any);

  useEffect(() => {
    console.log('mouted sandbox')
    if(!loading2){
      getData("https://jsonplaceholder.typicode.com/todo1s/1");
    }
    // dispatch(getFlightData());
  }, []);

  useEffect(() => {
    console.log("data", data);
    console.log("data", data2);
  }, [data]);

  console.log("data", data);
  return (
    <>
      {success && JSON.stringify(data)}
      {loading && <p>........loading .............</p>}
      {error && <p>{error}</p>}
      <hr/>
      {!errorMsg && JSON.stringify(data2)}
      {loading2 && <p>........loading .............</p>}
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};

export default Sanbox;
