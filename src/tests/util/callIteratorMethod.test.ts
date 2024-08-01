import { callIteratorMethod, callAsyncIteratorMethod } from "@~main/util/callIteratorMethod";

import { describe, expect, it } from "vitest";
import TestObjects from "@~test/lib/TestObjects";

import { isGenerator, isIterator } from "@~types/runtime/checks";

describe("generators", () => {
  it("should also be iterators", () => {
    const generator = TestObjects.newGenerator();
    expect(generator).toSatisfy(isGenerator);
    expect(generator).toSatisfy(isIterator);
  })
});

describe(callIteratorMethod.name, () => {
  it("should be able to call methods on iterators", () => {
    const iterator = TestObjects.newIterator();
    expect(iterator).toSatisfy(isIterator);
    const iteratorResult = callIteratorMethod(iterator, "next");
    expect(iteratorResult.done).toBeFalsy();
    expect(iteratorResult).toHaveProperty("value");
  });
});

describe(callAsyncIteratorMethod.name, () => {
  it("should be able to call methods on async iterators", async () => {
    const asyncIterator = TestObjects.newAsyncIterator();
    const iteratorResult = await callAsyncIteratorMethod(asyncIterator, "next");
    expect(iteratorResult.done).toBeFalsy();
    expect(iteratorResult).toHaveProperty("value");
  })
});