import { describe, expect, it } from "vitest";
import iteratorFilterAsync from "../../../../src/iterators/operations/async/iteratorFilterAsync";
import typeOf from "../../../../src/util/types/runtime/typeOf";
import { asAsyncIterator } from "../../../../src/util/convert/toAsyncIterator";
import TestObjects from "../../../../src/TestObjects";

describe(iteratorFilterAsync.name, async () => {
  it("should be an async generator function", () => {
    expect(iteratorFilterAsync).toSatisfy(x => typeOf(x) === "AsyncGeneratorFunction");
  });
  it("should behave the same way as filter for arrays", async () => {
    const isEven = (x: number) => x % 2 === 0;

    const array = TestObjects.newArray();
    const expected = array.filter(isEven);

    const asyncIterator = asAsyncIterator(array[Symbol.iterator]());
    const asyncGenerator = iteratorFilterAsync(asyncIterator, async (x) => isEven(x));
    const resultArray = await arrayFromAsync(asyncGenerator);

    expect(resultArray).toEqual(expected);
  });
});

async function arrayFromAsync<T, TReturn = void, TNext = unknown>(x: AsyncGenerator<T, TReturn, TNext>) {
  const result: T[] = [];
  for (let itResult = await x.next(); !itResult.done; itResult = await x.next()) {
    result.push(itResult.value);
  }
  return result;
}