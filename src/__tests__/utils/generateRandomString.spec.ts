import { generateRandomString } from "../../utils/randomStringGenerator.ts";

test("generates a random string of the specified length", () => {
  const length = 10;
  const randomString = generateRandomString(length);

  expect(randomString).toHaveLength(length);
});
