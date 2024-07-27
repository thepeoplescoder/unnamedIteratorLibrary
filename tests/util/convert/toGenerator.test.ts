import { describe, it, expect } from "vitest";
import { toGenerator } from "../../../src/util/convert/toGenerator";
import { isGenerator, isIterator } from "../../../src/util/types/runtime/checks";

describe(toGenerator.name, () => {
  it("should act as the identity function if a generator is passed", () => {
    const generator = getNewTestGenerator();
    expect(toGenerator(generator)).toBe(generator);
  });
  it("should convert iterables to generators", () => {
    const iterable = getNewTestIterable();
    expect(toGenerator(iterable)).toSatisfy(isGenerator);
  });
  it("should convert iterators to generators", () => {
    const iterator = getNewTestIterator();
    expect(iterator).toSatisfy(isIterator);
    expect(toGenerator(iterator)).toSatisfy(isGenerator);
  });
});

function *getNewTestGenerator() {
  for (const thing in getNewTestIterable()) {
    yield thing;
  }
}

function getNewTestIterator() {
  return getNewTestIterable()[Symbol.iterator]();
}

function getNewTestIterable() {
  return getNewTestArray();
}

function getNewTestArray() {
  return [1, 2, 3, 4, 5, 6];
}