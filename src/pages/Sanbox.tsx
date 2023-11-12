// import { useAppDispatch, useAppSelector } from "../store";
// import { ApiResponseError, FlightTableItem } from "../http";
// import { FlightDataService } from "../http/services/flights.ts";
// import { FC, useEffect } from "react";
// import useFetcher from "../hooks/useFetcher.tsx";
//
// const Sanbox: FC = () => {
//   const { data, error, loading, success } = useAppSelector(
//     (state) => state.flightBoard,
//   );
//   const dispatch = useAppDispatch();
//
//   const {
//     data: data2,
//     sendReq,
//     loading: loading2,
//     errorMsg,
//   } = useFetcher<ApiResponseError | FlightTableItem[]>(
//     FlightDataService.getFlightsData2,
//   );
//
//   useEffect(() => {
//     console.log("mouted sandbox");
//     if (!loading2) {
//       getData();
//     }
//     // dispatch(getFlightData());
//   }, []);
//
//   useEffect(() => {
//     console.log("data", data);
//     console.log("data", data2);
//   }, [data]);
//
//   console.log("data", data);
//   return (
//     <>
//       {success && JSON.stringify(data)}
//       {loading && <p>........loading .............</p>}
//       {error && <p>{error}</p>}
//       <hr />
//       {!errorMsg && !loading2 && JSON.stringify(data2)}
//       {loading2 && <p>........loading .............</p>}
//       {errorMsg && <p>{errorMsg}</p>}
//     </>
//   );
// };
//
// export default Sanbox;
