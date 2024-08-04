import iteratorForEachAsync from "@~main/iterators/operations/async/iteratorForEachAsync";

import { describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";

import typeOf from "@~types/runtime/typeOf";
import { asAsyncIterator } from "@~main/util/convert/asAsyncIterator";

describe(iteratorForEachAsync.name, () => {
  it("should be an async function", () => {
    const result = typeOf(iteratorForEachAsync) === "AsyncFunction";
    expect(result).toBe(true);
  });
  it("should behave the same way as forEach for arrays", async () => {
    const [accumulateSync,  getSumSync]  = createAccumulator();
    const [accumulateAsync, getSumAsync] = createAsyncAccumulatorBasedOn(createAccumulator());

    const testArray = TestObjects.newArray();
    const asyncIterator = asAsyncIterator(testArray[Symbol.iterator]());

    testArray.forEach(accumulateSync);
    await iteratorForEachAsync(asyncIterator, accumulateAsync);

    const expected = getSumSync();
    const result = getSumAsync();

    expect(result).toEqual(expected);

    return;

    function createAsyncAccumulatorBasedOn(accumulator: ReturnType<typeof createAccumulator>) {
      const [accumulateSync, getSum] = accumulator;
      const accumulate = async (x: number) => accumulateSync(x);
      return [accumulate, getSum] as [typeof accumulate, typeof getSum];
    }

    function createAccumulator() {
      let sum = 0;
      const accumulate = (x: number) => sum += x;
      const getSum = () => sum;
      return [accumulate, getSum] as [typeof accumulate, typeof getSum];
    }
  });
});