import { toGenerator } from "@~main/util/convert/toGenerator";

import { describe, it, expect } from "vitest";
import TestObjects from "@~lib/test/TestObjects";

import { isGenerator, isIterator } from "@~types/runtime/checks";

describe(toGenerator.name, () => {
  it("should act as the identity function if a generator is passed", () => {
    const generator = TestObjects.newGenerator();
    expect(toGenerator(generator)).toBe(generator);
  });
  it("should convert iterables to generators", () => {
    const iterable = TestObjects.newIterable();
    expect(toGenerator(iterable)).toSatisfy(isGenerator);
  });
  it("should convert iterators to generators", () => {
    const iterator = TestObjects.newIterator();
    expect(iterator).toSatisfy(isIterator);
    expect(toGenerator(iterator)).toSatisfy(isGenerator);
  });
});