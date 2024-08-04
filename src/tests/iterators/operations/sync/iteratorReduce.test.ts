import iteratorReduce from "@~main/iterators/operations/sync/iteratorReduce";
import TestObjects from "@~lib/test/TestObjects";

import { describe, expect, it } from "vitest";

describe(iteratorReduce.name, () => {
  it("should be a function", () => {
    expect(iteratorReduce).toBeTypeOf("function");
  });
  it("should behave similarly to reduce for arrays", () => {
    const array = TestObjects.newArray();
    const iterator = array[Symbol.iterator]();

    const sumReducer = (a: typeof array[number], b: typeof array[number]) => a + b;

    const result = iteratorReduce(iterator, sumReducer);
    const expected = array.reduce(sumReducer);

    expect(result).toEqual(expected);
  });
});