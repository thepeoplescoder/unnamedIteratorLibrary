import { describe, expect, it } from "vitest";
import iteratorForEachAsync from "../../../../src/iterators/operations/async/iteratorForEachAsync";
import typeOf from "../../../../src/util/types/runtime/typeOf";
import { asAsyncIterator } from "../../../../src/util/convert/toAsyncIterator";
import TestObjects from "../../../../src/TestObjects";

describe(iteratorForEachAsync.name, async () => {
  it("should be an async function", () => {
    expect(iteratorForEachAsync).toSatisfy(x => typeOf(x) === "AsyncFunction");
  });
  it("should behave the same way as forEach for arrays", async () => {
    const [accumulateSync,  getSumSync]  = createAccumulator();
    const [accumulateAsync, getSumAsync] = createAsyncAccumulatorBasedOn(createAccumulator());

    const testArray = TestObjects.newArray();
    testArray.forEach(accumulateSync);

    const asyncIterator = asAsyncIterator(testArray[Symbol.iterator]());
    await iteratorForEachAsync(asyncIterator, accumulateAsync);

    expect(getSumSync()).toEqual(getSumAsync());

    return;

    function createAsyncAccumulatorBasedOn(
      accumulator: ReturnType<typeof createAccumulator>
    ): [(x: number) => Promise<void>, () => number]
    {
      const [accumulateSync, getSum] = accumulator;
      const accumulate = async (x) => accumulateSync(x);
      return [accumulate, getSum];
    }

    function createAccumulator(): [(x: number) => void, () => number] {
      let sum = 0;
      const accumulate = x => sum += x;
      const getSum = () => sum;
      return [accumulate, getSum];
    }
  });
});