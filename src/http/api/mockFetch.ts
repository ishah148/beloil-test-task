import { flightData } from "../services/mockData.ts";

const DELAY = 500;

/**
 * @function getMockFlightData
 * Imitate mock api. Doing query with some delay and error with random conditions
 */
export async function getMockFlightData(
  page: number,
  pageLimit: number,
  error?: boolean,
) {
  const isError = error || !!Math.ceil(Math.random() - 0);

  const slicedData = flightData.slice((page - 1) * pageLimit, page * pageLimit);
  return new Promise((resolve, reject) => {
    if (error) {
      throw new Error("Случайная ошибка!");
    }
    if (!isError) setTimeout(() => resolve(slicedData), DELAY);
    else setTimeout(() => reject({ error: "ACCESS_DENIED" }), 200);
  });
}
