import { describe, expect, test } from "@jest/globals";
import { forTest } from "../composables/forTest.ts";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(forTest()).toBe(12);
  });
});
