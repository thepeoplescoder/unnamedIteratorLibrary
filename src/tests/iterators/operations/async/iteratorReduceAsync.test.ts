import TestObjects from "@~lib/test/TestObjects";
import iteratorReduceAsync from "@~main/iterators/operations/async/iteratorReduceAsync";
import { asAsyncIterator } from "@~main/util/convert/asAsyncIterator";
import typeOf from "@~main/util/types/runtime/typeOf";

import { describe, expect, it } from "vitest";

describe(iteratorReduceAsync.name, async () => {
  it("should be an async function", () => {
    const result = typeOf(iteratorReduceAsync) === "AsyncFunction";
    expect(result).toBe(true);
  });
  it("should behave similar to reduce for arrays", async () => {
    const array = TestObjects.newArray();
    const iterator = array[Symbol.iterator]();

    const asyncIterator = asAsyncIterator(iterator);
    expect(typeOf(asyncIterator.next)).toBe("AsyncFunction");

    const reducer = (a: typeof array[number], b: typeof a) => a + b;

    const expected = array.reduce(reducer);
    const result = await iteratorReduceAsync<typeof array[number]>(asyncIterator, async (a, b) => reducer(a, b));

    expect(result).toEqual(expected);
  });
});