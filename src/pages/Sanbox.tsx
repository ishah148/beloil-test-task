import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store";
import { getFlightData } from "../store/flightBoard/flightBoardThunks.ts";

const Sanbox: FC = () => {
  const { data, error, loading, success } = useAppSelector(
    (state) => state.flightBoard,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFlightData());
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  console.log("data", data);
  return (
    <>
      {success && JSON.stringify(data)}
      {loading && <p>........loading .............</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default Sanbox;
