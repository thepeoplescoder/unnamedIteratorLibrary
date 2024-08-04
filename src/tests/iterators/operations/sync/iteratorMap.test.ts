import iteratorMap from "@~main/iterators/operations/sync/iteratorMap";
import TestObjects from "@~lib/test/TestObjects";
import typeOf from "@~main/util/types/runtime/typeOf";

import { describe, expect, it } from "vitest";

describe(iteratorMap.name, () => {
  it("should be a generator function", () => {
    const result = typeOf(iteratorMap) === "GeneratorFunction";
    expect(result).toBe(true);
  });
  it("should behave similarly to map for arrays", () => {
    const array = TestObjects.newArray();
    const iterator = array[Symbol.iterator]();
    const twice = (x: typeof array[number]) => x + x;

    const result = iteratorMap(iterator, twice);
    const expected = array.map(twice);

    expect(Array.from(result)).toEqual(expected);
  });
});