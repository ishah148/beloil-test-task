import { $api } from "../api";
import { getMockFlightData } from "../api/mockFetch.ts";
import { ApiResponseError, FlightTableItem } from "../index.ts";
import { TableParams } from "../../components/dataTable/DataTable.types.ts";
import { Inputs } from "../../components/flightCreator/types.ts";

export class FlightDataService {
  static async getFlightsData() {
    return (await getMockFlightData(1, 10)) as unknown as
      | FlightTableItem[]
      | ApiResponseError;
  }

  static async getFlightsData2(
    params: Record<string, string | number | boolean | undefined | null>,
  ) {
    return $api.get<FlightTableItem[] | ApiResponseError>(
      `src/http/services/mockFlights.json`,
      { params },
    );
  }
  static async delete(id: string) {
    return $api.delete(`/delete/${id}`);
  }

  static async create(params: Inputs) {
    return $api.post("/create", params);
  }
}
