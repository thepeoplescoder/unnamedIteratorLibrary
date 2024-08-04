import TestObjects from "@~lib/test/TestObjects";
import iteratorFilter from "@~main/iterators/operations/sync/iteratorFilter";
import typeOf from "@~main/util/types/runtime/typeOf";

import { describe, expect, it } from "vitest";

describe(iteratorFilter.name, () => {
  it("should be a generator function", () => {
    const result = typeOf(iteratorFilter) === "GeneratorFunction";
    expect(result).toBe(true);
  });
  it("should behave similar to filter for arrays", () => {
    const array = TestObjects.newArray();
    const iterator = array[Symbol.iterator]();

    const isEven = (x: typeof array[number]) => x % 2 === 0;

    const expected = array.filter(isEven);
    const result = iteratorFilter(iterator, isEven);

    expect(Array.from(result)).toEqual(expected);
  });
});