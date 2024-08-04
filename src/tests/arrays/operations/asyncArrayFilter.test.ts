import { asyncArrayFilter } from "@~main/arrays/operations/asyncArrayFilter";

import { describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";
import typeOf from "@~main/util/types/runtime/typeOf";
import { isPromise } from "@~main/util/types/runtime/checks";

describe(asyncArrayFilter.name, () => {
  it("should be an async function", () => {
    const result = typeOf(asyncArrayFilter) === "AsyncFunction";
    expect(result).toBe(true);
  });
  it("should return a promise containing an array", async () => {
    const promise = asyncArrayFilter(TestObjects.newArray(), async (x) => true);
    expect(promise).toSatisfy(isPromise);
    expect(await promise).toSatisfy(Array.isArray);
  });
  it("should apply asynchronous callbacks similar to sync array filter", async () => {
    const isEven = (x: number) => x % 2 === 0;

    const array = TestObjects.newArray();

    const expected = array.filter(isEven);
    const result   = await asyncArrayFilter(array, async (x) => isEven(x));

    expect(result).toEqual(expected);
  });
});