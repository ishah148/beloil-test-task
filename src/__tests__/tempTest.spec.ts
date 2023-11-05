// import { describe, expect, test } from "@jest/globals";
import { forTest } from "../composables/forTest.ts";

describe("sum module", () => {
  test("good", () => {
    expect(forTest()).toBe(12);
  });
  test("error", () => {
    expect(forTest()).toBe(13);
  });
});
