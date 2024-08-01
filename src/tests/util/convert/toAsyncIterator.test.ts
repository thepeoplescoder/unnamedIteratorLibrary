import { asAsyncIterator, toAsyncIterator } from "@~main/util/convert/toAsyncIterator";

import { describe, it, expect } from "vitest";
import TestObjects from "@~test/lib/TestObjects";

import { isIterator, isPromise } from "@~types/runtime/checks";

describe(asAsyncIterator.name, () => {
  it("should wrap plain iterators into async iterators", async () => {
    const array = TestObjects.newArray();
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