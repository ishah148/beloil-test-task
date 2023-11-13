import { $api } from "../api";
import { getMockFlightData } from "../api/mockFetch.ts";
import { ApiResponseError, BookingTableItem } from "../index.ts";
import { BookingFieldsNames } from "../../components/bookingEditor/types.ts";

export class BookingDataService {
  static async getFlightsData() {
    return (await getMockFlightData(1, 10)) as unknown as
      | BookingTableItem[]
      | ApiResponseError;
  }

  static async getFlightsData2(
    params: Record<string, string | number | boolean | undefined | null>,
  ) {
    return $api.get<BookingTableItem[] | ApiResponseError>(
      `src/http/services/mockBooking.json`,
      { params },
    );
  }
  static async delete(id: string) {
    return $api.delete(`/booking/delete/${id}`);
  }

  static async edit(params: BookingFieldsNames) {
    return $api.patch(`/booking/edit/`, { params });
  }

  static async create(params: BookingFieldsNames) {
    return $api.post("/booking/create", { params });
  }
}
