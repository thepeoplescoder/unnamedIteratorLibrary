import TestObjects from "@~lib/test/TestObjects";
import iteratorChain from "@~main/iterators/operations/sync/iteratorChain";
import typeOf from "@~main/util/types/runtime/typeOf";

import { describe, expect, it } from "vitest";

describe(iteratorChain.name, () => {
  it("should be a generator function", () => {
    const result = typeOf(iteratorChain) === "GeneratorFunction";
    expect(result).toBe(true);
  });
  it("should behave similarly to concat for arrays", () => {
    const twice = (x: any) => x + x;
    const array1 = TestObjects.newArray();
    const array2 = array1.map(twice);
    const array3 = array2.map(twice);

    const arrays = [array1, array2, array3];
    const iterators = arrays.map(array => array[Symbol.iterator]());

    const expected = arrays[0].concat(arrays[1], arrays[2]);
    const result = iteratorChain(iterators[0], iterators[1], iterators[2]);

    expect(Array.from(result)).toEqual(expected);
  });
});