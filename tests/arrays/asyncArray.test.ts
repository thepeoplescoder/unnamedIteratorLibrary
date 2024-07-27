import { awrap } from "../../src/arrays/asyncArray";
import { describe, expect, it } from "vitest";
import TestObjects from "../testObjects";

describe("awrap", () => {
  it("should be a function", () => {
    expect(awrap).toBeTypeOf("function");
  });
  it("should provide access to the underlying array via the _ property", () => {
    const array = TestObjects.newArray();
    expect(awrap(array)._).toBe(array);
  });
});