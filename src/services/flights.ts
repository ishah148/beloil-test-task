import { $api } from "../http/api";

import { ApiResponseError, FlightTableItem } from "../http";
import { FlightsFieldsNames } from "../components/flights/flightCreator/types.ts";
import { FlightsEditFieldsNames } from "../components/flights/flightEditor/types.ts";

export class FlightDataService {

  static async getFlightsData2(
      params: Record<string, string | number | boolean | undefined | null>,
  ) {
    return $api.get<FlightTableItem[] | ApiResponseError>(
        `/flights`,
        { params },
    );
  }

  static async getFlightsData(
    params: Record<string, string | number | boolean | undefined | null>,
  ) {
    return $api.get<FlightTableItem[] | ApiResponseError>(
      `src/services/mockFlights.json`,
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
