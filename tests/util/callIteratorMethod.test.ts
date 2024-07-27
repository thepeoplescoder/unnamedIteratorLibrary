import { assert, describe, expect, it } from "vitest";
import { callIteratorMethod, callAsyncIteratorMethod } from "../../src/util/callIteratorMethod";
import { isGenerator, isIterator } from "../../src/util/types/runtime/checks";
import { asAsyncIterator } from "../../src/util/convert/toAsyncIterator";

describe("generators", () => {
  it("should also be iterators", () => {
    const generator = getNewTestGenerator();
    expect(generator).toSatisfy(isGenerator);
    expect(generator).toSatisfy(isIterator);
  })
});

describe(callIteratorMethod.name, () => {
  it("should be able to call methods on iterators", () => {
    const iterator = getNewTestIterator();
    expect(iterator).toSatisfy(isIterator);
    const iteratorResult = callIteratorMethod(iterator, "next");
    expect(iteratorResult.done).toBeFalsy();
    expect(iteratorResult).toHaveProperty("value");
  });
});

describe(callAsyncIteratorMethod.name, () => {
  it("should be able to call methods on async iterators", async () => {
    const iterator = getNewTestIterator();
    const asyncIterator = asAsyncIterator(iterator);
    const iteratorResult = await callAsyncIteratorMethod(asyncIterator, "next");
    expect(iteratorResult.done).toBeFalsy();
    expect(iteratorResult).toHaveProperty("value");
  })
});

function* getNewTestGenerator() {
  for (const x in getNewTestIterable()) {
    yield x;
  }
}

function getNewTestIterator() {
  return getNewTestIterable()[Symbol.iterator]();
}

function getNewTestIterable() {
  return getNewTestArray();
}

function getNewTestArray() {
  const array = [1, 2, 3, 4, 5, 6, 7];
  assert(array.length >= 5);
  return array;
}