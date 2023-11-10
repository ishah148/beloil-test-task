export interface FlightTableItem {
  flight_id: string;
  city: string;
  departure_time: string;
  airline_name: string;
  checkin_time: string;
  seat_capacity: number;
  notes: string;
}

export interface ApiResponseError { //todo move
  error: string;
  [key: string]: number | string | boolean;
}

export function isFlightTableData(data: unknown[]): data is FlightTableItem[] {//todo move
  if (!data || !data?.[0]) return false;
  return (data as FlightTableItem[])?.[0]?.flight_id !== undefined;
}

export const isApiError = ( //todo move
  value: Record<string, any>,
): value is ApiResponseError => {
  return (value as ApiResponseError)?.error !== undefined;
};

export const flightData: FlightTableItem[] = [
  {
    flight_id: "AA-001",
    city: "New York",
    departure_time: "2024-01-01 15:00:00",
    airline_name: "American Airlines",
    checkin_time: "2024-01-01 14:15:00",
    seat_capacity: 45,
    notes: "none",
  },
  {
    flight_id: "AA-123",
    city: "New York",
    departure_time: "2024-03-10 08:45:00",
    airline_name: "Delta Airlines",
    checkin_time: "2024-03-10 08:00:00",
    seat_capacity: 58,
    notes: "none",
  },
  {
    flight_id: "AB-123",
    city: "Los Angeles",
    departure_time: "2024-01-02 16:45:00",
    airline_name: "Delta Air Lines",
    checkin_time: "2024-01-02 16:00:00",
    seat_capacity: 67,
    notes: "Optional note 1",
  },
  {
    flight_id: "AB-345",
    city: "Budapest",
    departure_time: "2024-01-23 12:15:00",
    airline_name: "Wizz Air",
    checkin_time: "2024-01-23 11:45:00",
    seat_capacity: 44,
    notes: "none",
  },
  {
    flight_id: "AC-3453",
    city: "Tokyo",
    departure_time: "2024-01-21 13:30:00",
    airline_name: "Air France",
    checkin_time: "2024-01-21 12:20:00",
    seat_capacity: 99,
    notes: "none",
  },
  {
    flight_id: "BB-3453",
    city: "Moskow",
    departure_time: "2024-01-12 14:30:00",
    airline_name: "Emirates",
    checkin_time: "2024-01-12 10:20:00",
    seat_capacity: 99,
    notes: "none",
  },
  {
    flight_id: "BB-456",
    city: "Los Angeles",
    departure_time: "2024-06-15 17:20:00",
    airline_name: "American Airlines",
    checkin_time: "2024-06-15 16:40:00",
    seat_capacity: 71,
    notes: "none",
  },
  {
    flight_id: "BC-321",
    city: "Vienna",
    departure_time: "2024-01-24 16:30:00",
    airline_name: "Austrian Airlines",
    checkin_time: "2024-01-24 15:45:00",
    seat_capacity: 69,
    notes: "Optional note 6",
  },
  {
    flight_id: "BC-456",
    city: "London",
    departure_time: "2024-01-03 12:30:00",
    airline_name: "British Airways",
    checkin_time: "2024-01-03 12:00:00",
    seat_capacity: 34,
    notes: "none",
  },
  {
    flight_id: "BC-777",
    city: "Gomel",
    departure_time: "2024-01-01 15:30:00",
    airline_name: "Belavia",
    checkin_time: "2024-01-01 13:29:59",
    seat_capacity: 78,
    notes: "none",
  },
  {
    flight_id: "BC-778",
    city: "Gomel",
    departure_time: "2024-01-01 15:30:00",
    airline_name: "Belavia",
    checkin_time: "2024-01-01 13:29:59",
    seat_capacity: 78,
    notes: "none",
  },
  {
    flight_id: "BА-884",
    city: "Gomel",
    departure_time: "2024-01-01 14:30:00",
    airline_name: "Belavia",
    checkin_time: "2024-01-01 13:29:59",
    seat_capacity: 78,
    notes: "none",
  },
  {
    flight_id: "BА-885",
    city: "Gomel",
    departure_time: "2024-01-01 15:30:00",
    airline_name: "Belavia",
    checkin_time: "2024-01-01 13:29:59",
    seat_capacity: 78,
    notes: "none",
  },
  {
    flight_id: "CC-789",
    city: "London",
    departure_time: "2024-02-20 12:10:00",
    airline_name: "British Airways",
    checkin_time: "2024-02-20 11:30:00",
    seat_capacity: 33,
    notes: "none",
  },
  {
    flight_id: "CD-111",
    city: "Warsaw",
    departure_time: "2024-01-25 18:20:00",
    airline_name: "LOT Polish Airlines",
    checkin_time: "2024-01-25 17:30:00",
    seat_capacity: 37,
    notes: "none",
  },
  {
    flight_id: "DD-234",
    city: "Paris",
    departure_time: "2024-07-05 09:55:00",
    airline_name: "Lufthansa",
    checkin_time: "2024-07-05 09:20:00",
    seat_capacity: 92,
    notes: "none",
  },
  {
    flight_id: "DE-222",
    city: "Helsinki",
    departure_time: "2024-01-26 21:50:00",
    airline_name: "Finnair",
    checkin_time: "2024-01-26 21:15:00",
    seat_capacity: 25,
    notes: "none",
  },
  {
    flight_id: "DE-789",
    city: "Paris",
    departure_time: "2024-01-04 17:15:00",
    airline_name: "Air France",
    checkin_time: "2024-01-04 16:30:00",
    seat_capacity: 23,
    notes: "Optional note 2",
  },
  {
    flight_id: "EE-567",
    city: "Sydney",
    departure_time: "2024-11-30 14:45:00",
    airline_name: "Qantas",
    checkin_time: "2024-11-30 14:00:00",
    seat_capacity: 5,
    notes: "none",
  },
  {
    flight_id: "EF-444",
    city: "Oslo",
    departure_time: "2024-01-27 11:00:00",
    airline_name: "SAS",
    checkin_time: "2024-01-27 10:15:00",
    seat_capacity: 54,
    notes: "none",
  },
  {
    flight_id: "FF-890",
    city: "Tokyo",
    departure_time: "2024-09-08 21:30:00",
    airline_name: "Cathay Pacific",
    checkin_time: "2024-09-08 21:00:00",
    seat_capacity: 87,
    notes: "none",
  },
  {
    flight_id: "FG-234",
    city: "Tokyo",
    departure_time: "2024-01-05 19:45:00",
    airline_name: "Japan Airlines",
    checkin_time: "2024-01-05 19:00:00",
    seat_capacity: 55,
    notes: "none",
  },
  {
    flight_id: "FG-555",
    city: "Copenhagen",
    departure_time: "2024-01-28 14:25:00",
    airline_name: "Norwegian",
    checkin_time: "2024-01-28 13:45:00",
    seat_capacity: 62,
    notes: "none",
  },
  {
    flight_id: "GG-123",
    city: "Beijing",
    departure_time: "2024-04-18 16:20:00",
    airline_name: "Emirates",
    checkin_time: "2024-04-18 15:40:00",
    seat_capacity: 23,
    notes: "none",
  },
  {
    flight_id: "GH-123",
    city: "Stockholm",
    departure_time: "2024-01-29 17:40:00",
    airline_name: "SAS",
    checkin_time: "2024-01-29 17:00:00",
    seat_capacity: 38,
    notes: "none",
  },
  {
    flight_id: "GH-765",
    city: "Sydney",
    departure_time: "2024-01-06 14:50:00",
    airline_name: "Qantas",
    checkin_time: "2024-01-06 14:15:00",
    seat_capacity: 78,
    notes: "none",
  },
  {
    flight_id: "HH-456",
    city: "Dubai",
    departure_time: "2024-05-12 10:40:00",
    airline_name: "Singapore Airlines",
    checkin_time: "2024-05-12 10:00:00",
    seat_capacity: 64,
    notes: "none",
  },
  {
    flight_id: "HI-432",
    city: "Dubai",
    departure_time: "2024-01-07 22:30:00",
    airline_name: "Emirates",
    checkin_time: "2024-01-07 21:45:00",
    seat_capacity: 32,
    notes: "none",
  },
  {
    flight_id: "HI-987",
    city: "Athens",
    departure_time: "2024-01-30 15:05:00",
    airline_name: "Aegean Airlines",
    checkin_time: "2024-01-30 14:30:00",
    seat_capacity: 49,
    notes: "none",
  },
  {
    flight_id: "II-789",
    city: "Mumbai",
    departure_time: "2024-08-25 23:15:00",
    airline_name: "Delta Airlines",
    checkin_time: "2024-08-25 22:30:00",
    seat_capacity: 41,
    notes: "none",
  },
  {
    flight_id: "IJ-001",
    city: "Istanbul",
    departure_time: "2024-01-08 16:00:00",
    airline_name: "Turkish Airlines",
    checkin_time: "2024-01-08 15:15:00",
    seat_capacity: 11,
    notes: "Optional note 3",
  },
  {
    flight_id: "JJ-234",
    city: "New York",
    departure_time: "2024-11-15 07:55:00",
    airline_name: "Emirates",
    checkin_time: "2024-11-15 07:20:00",
    seat_capacity: 79,
    notes: "none",
  },
  {
    flight_id: "JK-222",
    city: "Berlin",
    departure_time: "2024-01-09 13:20:00",
    airline_name: "Lufthansa",
    checkin_time: "2024-01-09 12:45:00",
    seat_capacity: 66,
    notes: "none",
  },
  {
    flight_id: "KK-567",
    city: "Los Angeles",
    departure_time: "2024-04-03 15:30:00",
    airline_name: "British Airways",
    checkin_time: "2024-04-03 14:50:00",
    seat_capacity: 12,
    notes: "none",
  },
  {
    flight_id: "KL-654",
    city: "Rome",
    departure_time: "2024-01-10 18:10:00",
    airline_name: "Alitalia",
    checkin_time: "2024-01-10 17:30:00",
    seat_capacity: 43,
    notes: "none",
  },
  {
    flight_id: "LL-890",
    city: "London",
    departure_time: "2024-03-19 18:20:00",
    airline_name: "Qantas",
    checkin_time: "2024-03-19 17:40:00",
    seat_capacity: 68,
    notes: "none",
  },
  {
    flight_id: "MM-123",
    city: "Paris",
    departure_time: "2024-07-22 14:15:00",
    airline_name: "Cathay Pacific",
    checkin_time: "2024-07-22 13:35:00",
    seat_capacity: 86,
    notes: "none",
  },
  {
    flight_id: "MN-543",
    city: "Amsterdam",
    departure_time: "2024-01-11 10:30:00",
    airline_name: "KLM",
    checkin_time: "2024-01-11 10:00:00",
    seat_capacity: 56,
    notes: "none",
  },
  {
    flight_id: "NN-456",
    city: "Sydney",
    departure_time: "2024-01-29 10:25:00",
    airline_name: "Lufthansa",
    checkin_time: "2024-01-29 09:45:00",
    seat_capacity: 7,
    notes: "none",
  },
  {
    flight_id: "NO-098",
    city: "Hong Kong",
    departure_time: "2024-01-12 20:00:00",
    airline_name: "Cathay Pacific",
    checkin_time: "2024-01-12 19:15:00",
    seat_capacity: 88,
    notes: "none",
  },
  {
    flight_id: "OO-789",
    city: "Tokyo",
    departure_time: "2024-06-11 19:50:00",
    airline_name: "Singapore Airlines",
    checkin_time: "2024-06-11 19:10:00",
    seat_capacity: 50,
    notes: "none",
  },
  {
    flight_id: "OP-5647",
    city: "Minsk",
    departure_time: "2024-02-08 09:30:00",
    airline_name: "Belavia",
    checkin_time: "2024-02-08 07:30:00",
    seat_capacity: 90,
    notes: "none",
  },
  {
    flight_id: "OP-675",
    city: "Singapore",
    departure_time: "2024-01-13 17:45:00",
    airline_name: "Singapore Airlines",
    checkin_time: "2024-01-13 17:00:00",
    seat_capacity: 22,
    notes: "none",
  },
  {
    flight_id: "PP-234",
    city: "Beijing",
    departure_time: "2024-09-28 16:40:00",
    airline_name: "American Airlines",
    checkin_time: "2024-09-28 16:00:00",
    seat_capacity: 31,
    notes: "none",
  },
  {
    flight_id: "PQ-123",
    city: "Toronto",
    departure_time: "2024-01-14 14:20:00",
    airline_name: "Air Canada",
    checkin_time: "2024-01-14 13:30:00",
    seat_capacity: 77,
    notes: "Optional note 4",
  },
  {
    flight_id: "QQ-567",
    city: "Dubai",
    departure_time: "2024-10-04 11:20:00",
    airline_name: "Delta Airlines",
    checkin_time: "2024-10-04 10:45:00",
    seat_capacity: 18,
    notes: "none",
  },
  {
    flight_id: "QR-777",
    city: "Shanghai",
    departure_time: "2024-01-15 12:30:00",
    airline_name: "China Eastern Airlines",
    checkin_time: "2024-01-15 12:00:00",
    seat_capacity: 31,
    notes: "none",
  },
  {
    flight_id: "RR-890",
    city: "Mumbai",
    departure_time: "2024-11-19 22:05:00",
    airline_name: "British Airways",
    checkin_time: "2024-11-19 21:30:00",
    seat_capacity: 43,
    notes: "none",
  },
  {
    flight_id: "RS-333",
    city: "Mumbai",
    departure_time: "2024-01-16 15:30:00",
    airline_name: "Air India",
    checkin_time: "2024-01-16 15:00:00",
    seat_capacity: 50,
    notes: "none",
  },
  {
    flight_id: "SS-234",
    city: "New York",
    departure_time: "2024-03-14 06:40:00",
    airline_name: "Emirates",
    checkin_time: "2024-03-14 06:05:00",
    seat_capacity: 55,
    notes: "none",
  },
  {
    flight_id: "ST-555",
    city: "Sao Paulo",
    departure_time: "2024-01-17 19:20:00",
    airline_name: "LATAM Airlines",
    checkin_time: "2024-01-17 18:45:00",
    seat_capacity: 65,
    notes: "none",
  },
  {
    flight_id: "TT-567",
    city: "Los Angeles",
    departure_time: "2024-06-27 18:30:00",
    airline_name: "Qantas",
    checkin_time: "2024-06-27 17:50:00",
    seat_capacity: 70,
    notes: "none",
  },
  {
    flight_id: "UU-890",
    city: "London",
    departure_time: "2024-02-07 12:25:00",
    airline_name: "Cathay Pacific",
    checkin_time: "2024-02-07 11:45:00",
    seat_capacity: 13,
    notes: "none",
  },
  {
    flight_id: "UV-654",
    city: "Beijing",
    departure_time: "2024-01-18 23:00:00",
    airline_name: "Air China",
    checkin_time: "2024-01-18 22:15:00",
    seat_capacity: 12,
    notes: "Optional note 5",
  },
  {
    flight_id: "VV-234",
    city: "Paris",
    departure_time: "2024-12-10 13:15:00",
    airline_name: "Lufthansa",
    checkin_time: "2024-12-10 12:30:00",
    seat_capacity: 29,
    notes: "none",
  },
  {
    flight_id: "VW-001",
    city: "Mexico City",
    departure_time: "2024-01-19 14:10:00",
    airline_name: "Aeromexico",
    checkin_time: "2024-01-19 13:30:00",
    seat_capacity: 40,
    notes: "none",
  },
  {
    flight_id: "WW-567",
    city: "Sydney",
    departure_time: "2024-07-03 08:55:00",
    airline_name: "Singapore Airlines",
    checkin_time: "2024-07-03 08:20:00",
    seat_capacity: 60,
    notes: "none",
  },
  {
    flight_id: "WX-987",
    city: "Cairo",
    departure_time: "2024-01-20 11:45:00",
    airline_name: "EgyptAir",
    checkin_time: "2024-01-20 11:00:00",
    seat_capacity: 71,
    notes: "none",
  },
  {
    flight_id: "XC-888",
    city: "Qatar",
    departure_time: "2024-01-21 21:30:00",
    airline_name: "Turkish Airlines",
    checkin_time: "2024-01-21 20:30:00",
    seat_capacity: 12,
    notes: "none",
  },
  {
    flight_id: "XI-567",
    city: "Qatar",
    departure_time: "2024-01-13 21:30:00",
    airline_name: "Turkish Airlines",
    checkin_time: "2024-01-13 20:30:00",
    seat_capacity: 1,
    notes: "none",
  },
  {
    flight_id: "XP-567",
    city: "Chicago",
    departure_time: "2024-01-13 09:30:00",
    airline_name: "Japan Airlines",
    checkin_time: "2024-01-13 08:30:00",
    seat_capacity: 1,
    notes: "none",
  },
  {
    flight_id: "XX-890",
    city: "Tokyo",
    departure_time: "2024-04-26 20:40:00",
    airline_name: "American Airlines",
    checkin_time: "2024-04-26 20:10:00",
    seat_capacity: 45,
    notes: "none",
  },
  {
    flight_id: "YY-234",
    city: "Beijing",
    departure_time: "2024-01-20 15:10:00",
    airline_name: "Delta Airlines",
    checkin_time: "2024-01-20 14:30:00",
    seat_capacity: 88,
    notes: "none",
  },
  {
    flight_id: "YZ-456",
    city: "Munich",
    departure_time: "2024-01-21 15:55:00",
    airline_name: "Lufthansa",
    checkin_time: "2024-01-21 15:15:00",
    seat_capacity: 26,
    notes: "none",
  },
  {
    flight_id: "ZA-888",
    city: "Barcelona",
    departure_time: "2024-01-22 14:40:00",
    airline_name: "Iberia",
    checkin_time: "2024-01-22 14:00:00",
    seat_capacity: 58,
    notes: "none",
  },
  {
    flight_id: "ZZ-567",
    city: "Dubai",
    departure_time: "2024-03-08 09:30:00",
    airline_name: "British Airways",
    checkin_time: "2024-03-08 08:50:00",
    seat_capacity: 2,
    notes: "none",
  },
];
