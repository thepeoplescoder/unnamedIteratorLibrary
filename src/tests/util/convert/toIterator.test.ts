import { toIterator } from "@~main/util/convert/toIterator";

import { describe, it, expect } from "vitest";
import TestObjects from "@~test/lib/TestObjects";

import { isIterator, isGenerator, isIterable } from "@~types/runtime/checks";

describe("toIterator", () => {
  it("should leave iterators unchanged", () => {
    const iterator = TestObjects.newIterator();
    expect(iterator).toSatisfy(isIterator);
    expect(toIterator(iterator)).toBe(iterator);
  });
  it("should leave generators unchanged", () => {
    const generator = TestObjects.newGenerator();
    expect(generator).toSatisfy(isGenerator);
    expect(toIterator(generator)).toBe(generator);
  });
  it("should turn (non-iterator) iterables to iterators", () => {
    const nonIteratorIterable = TestObjects.newIterable();
    expect(nonIteratorIterable).not.toSatisfy(isIterator);
    expect(nonIteratorIterable).toSatisfy(isIterable);
    expect(toIterator(nonIteratorIterable)).toSatisfy(isIterator);
  });
});