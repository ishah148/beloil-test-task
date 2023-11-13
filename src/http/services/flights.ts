import { $api } from "../api";
import { getMockFlightData } from "../api/mockFetch.ts";
import { ApiResponseError, FlightTableItem } from "../index.ts";
import { FlightsFieldsNames } from "../../components/flightCreator/types.ts";
import { FlightsEditFieldsNames } from "../../components/flightEditor/types.ts";

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
    return $api.delete(`/flight/delete/${id}`);
  }

  static async edit(params: FlightsEditFieldsNames) {
    return $api.patch(`/flight/edit/`, { params });
  }

  static async create(params: FlightsFieldsNames) {
    return $api.post("/flight/create", { params });
  }
}
