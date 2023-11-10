import { $api } from "../api";
import { getMockFlightData } from "../api/mockFetch.ts";
import {ApiResponseError, FlightTableItem} from "../index.ts";


export class FlightDataService {
  static async getFlightsData() {
    return (await getMockFlightData(
      1,
      10,
    )) as unknown as FlightTableItem[] | ApiResponseError;
  }

  static async getFlightsData2() {
    return $api.get("src/http/services/mockFlights.json");
  }
}
