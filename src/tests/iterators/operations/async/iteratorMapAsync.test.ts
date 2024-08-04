import arrayFromAsync from "@~lib/arrayFromAsync";
import TestObjects from "@~lib/test/TestObjects";
import iteratorMapAsync from "@~main/iterators/operations/async/iteratorMapAsync";
import { asAsyncIterator } from "@~main/util/convert/asAsyncIterator";
import typeOf from "@~main/util/types/runtime/typeOf";

import { describe, expect, it } from "vitest";

describe(iteratorMapAsync.name, async () => {
  it("should be an async generator function", () => {
    const result = typeOf(iteratorMapAsync) === "AsyncGeneratorFunction";
    expect(result).toBe(true);
  });
  it("should work the same way as the map method on arrays", async () => {
    const iterable = TestObjects.newIterable();

    const array         = Array.from(iterable);
    const iterator      = iterable[Symbol.iterator]();
    const asyncIterator = asAsyncIterator(iterator);

    const func = (x: typeof array[number]) => x + x;

    const result      = await iteratorMapAsync(asyncIterator, async (x) => func(x));
    const resultArray = await arrayFromAsync(result);
    const expected    = array.map(func);


    expect(resultArray).toEqual(expected);
  });
});