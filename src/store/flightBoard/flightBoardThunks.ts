import { createAsyncThunk } from "@reduxjs/toolkit";
import { FlightDataService } from "../../http/services/flights.ts";
import { FlightTableItem, isApiError } from "../../http";

export const getFlightData = createAsyncThunk<
  FlightTableItem[],
  void,
  { rejectValue: string }
>("flights/getFlightsData", async (_, thunkAPI) => {
  try {
    console.log("debug");
    const data = await FlightDataService.getFlightsData();
    if (isApiError(data)) {
      return thunkAPI.rejectWithValue(data.error);
    }
    return data;
  } catch (error) {
    if (isApiError(error)) {
      return thunkAPI.rejectWithValue(error?.error);
    } else {
      return thunkAPI.rejectWithValue(error as string);
    }
  }
});
