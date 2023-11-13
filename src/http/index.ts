export interface FlightTableItem {
  flight_id: string;
  city: string;
  departure_time: string;
  airline_name: string;
  checkin_time: string;
  seat_capacity: number;
  notes: string;
}

export interface ApiResponseError {
  //todo move
  error: string;
  [key: string]: number | string | boolean;
}

export function isFlightTableData(data: unknown[]): data is FlightTableItem[] {
  //todo move
  if (!data || !data?.[0]) return false;
  return (data as FlightTableItem[])?.[0]?.flight_id !== undefined;
}

export const isApiError = (
  //todo move
  value: unknown,
): value is ApiResponseError => {
  return (value as ApiResponseError)?.error !== undefined;
};
