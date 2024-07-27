import { describe, it, expect } from "vitest";
import { isIterator, isGenerator, isIterable } from "../../../src/util/types/runtime/checks";
import { toIterator } from "../../../src/util/convert/toIterator";

describe("toIterator", () => {
  it("should leave iterators unchanged", () => {
    const iterator = getNewTestIterator();
    expect(iterator).toSatisfy(isIterator);
    expect(toIterator(iterator)).toBe(iterator);
  });
  it("should leave generators unchanged", () => {
    const generator = getNewTestGenerator();
    expect(generator).toSatisfy(isGenerator);
    expect(toIterator(generator)).toBe(generator);
  });
  it("should turn (non-iterator) iterables to iterators", () => {
    const nonIteratorIterable = getNewTestNonIteratorIterable();
    expect(nonIteratorIterable).not.toSatisfy(isIterator);
    expect(nonIteratorIterable).toSatisfy(isIterable);
    expect(toIterator(nonIteratorIterable)).toSatisfy(isIterator);
  });
});

function getNewTestIterator() {
  return getNewTestArray().values();
}

function* getNewTestGenerator() {
  for (const x of getNewTestArray()) {
    yield x;
  }
}

function getNewTestNonIteratorIterable() {
  return getNewTestArray();
}

function getNewTestArray() {
  return [1, 2, 3, 4, 5];
}