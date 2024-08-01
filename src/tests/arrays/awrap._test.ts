import { awrap } from "@~main/arrays/awrap";

import { describe, expect, it } from "vitest";
import TestObjects from "@~test/lib/TestObjects";

describe(awrap.name, () => {
  it("should be a function", () => {
    expect(awrap).toBeTypeOf("function");
  });
  it("should provide access to the underlying array via the _ property", () => {
    const array = TestObjects.newArray();
    expect(awrap(array)._).toBe(array);
  });
});