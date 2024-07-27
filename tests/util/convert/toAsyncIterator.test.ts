import { describe, it, expect } from "vitest";
import { asAsyncIterator, toAsyncIterator } from "../../../src/util/convert/toAsyncIterator";
import { isIterator, isPromise } from "../../../src/util/types/runtime/checks";

describe(asAsyncIterator.name, () => {
  it("should wrap plain iterators into async iterators", async () => {
    const array = getNewTestArray();
    expect(array.some(v => isPromise(v))).toBe(false);
    expect(array.length).toBeGreaterThan(3);

    const iterator = array[Symbol.iterator]();
    const iteratorResult = iterator.next();
    expect(iteratorResult).not.toSatisfy(isPromise);

    const possibleAsyncIterator = asAsyncIterator(iterator);
    expect(possibleAsyncIterator).toSatisfy(isIterator);

    const possibleAsyncIteratorResult = possibleAsyncIterator.next();
    expect(possibleAsyncIteratorResult).toSatisfy(isPromise);
  });
});

describe(toAsyncIterator.name, () => {
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
  return [1, 2, 3, 4, 5];
}