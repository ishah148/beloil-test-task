import { createAsyncThunk } from "@reduxjs/toolkit";
import { FlightDataService } from "../../http/services/tableData.ts";
import { handleAxiosError } from "../../utils/handleAxiosError.ts";
import {
  ApiResponseError,
  FlightTableItem,
  isApiError,
} from "../../http/services/mockData.ts";

export const getFlightData = createAsyncThunk<
  FlightTableItem[],
  void,
  { rejectValue: string }
>("flights/getFlightsData", async (_, thunkAPI) => {
  try {
    console.log("debug");
    const data = await FlightDataService.getFlightsData();
    // if (isApiError(data)) {
    //   throw new Error(data.error);
    // } else {
    // }
    return data;
  } catch (error) {
    if (isApiError(error as any)) {
      return thunkAPI.rejectWithValue(error?.error);
    } else {
      return thunkAPI.rejectWithValue(error);
    }
  }
});
