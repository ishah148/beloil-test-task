import { $api } from "../http/api";

import { ApiResponseError, BookingTableItem } from "../http";
import { BookingFieldsNames } from "../components/booking/bookingEditor/types.ts";

export class BookingDataService {

  static async getFlightsData(
      params: Record<string, string | number | boolean | undefined | null>,
  ) {
    return $api.get<BookingTableItem[] | ApiResponseError>(
        `/flights`,
        { params },
    );
  }

  static async getFlightsData(
    params: Record<string, string | number | boolean | undefined | null>,
  ) {
    return $api.get<BookingTableItem[] | ApiResponseError>(
      `src/services/mockBooking.json`,
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
