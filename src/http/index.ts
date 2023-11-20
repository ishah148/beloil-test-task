export interface FlightTableItem {
  flightId: string;
  city: string;
  departureTime: string;
  airlineName: string;
  checkinTime: string;
  seatCapacity: number;
  notes: string;
}

export interface BookingTableItem {
  flightId: string;
  firstName: string;
  lastName: string;
  surname: string;
  bookingTime: string;
  seatNumber: number;
  notes: string;
}

export interface ApiResponseError {
  //todo move
  error: string;
  message: string;
  [key: string]: number | string | boolean;
}

export function isFlightTableData(data: unknown[]): data is FlightTableItem[] {
  //todo move
  if (!data || !data?.[0]) return false;
  return (data as FlightTableItem[])?.[0]?.flightId !== undefined;
}

export const isApiError = (
  //todo move
  value: unknown,
): value is ApiResponseError => {
  return (value as ApiResponseError)?.error !== undefined;
};
