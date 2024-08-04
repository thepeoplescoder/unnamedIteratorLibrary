import { iwrap } from "@~main/iterators/iwrap";

import { describe, it, expect, test } from "vitest";
import TestObjects from "@~lib/test/TestObjects";

import { isIterable, isIterator } from "@~types/runtime/checks";

describe("iwrap", () => {
  it("should be a function", () => {
    expect(iwrap).toBeTypeOf("function");
  });
  it("should wrap iterables into iterators", () => {
    const result = iwrap(TestObjects.newIterable());
    expect(result).toSatisfy(isIterator);
  });
  it("should accept an iterator and return an iterator", () => {
    const result = iwrap(TestObjects.newIterator());
    expect(result).toSatisfy(isIterator);
  });
  it("should accept a generator and return an iterator", () => {
    const result = iwrap(TestObjects.newGenerator());
    expect(result).toSatisfy(isIterator);
  });
  it("should produce iterable iterators", () => {
    const results = [iwrap(TestObjects.newIterable()), iwrap(TestObjects.newIterator()), iwrap(TestObjects.newGenerator())]
      .map(obj => isIterable(obj) && isIterator(obj));
    expect(results).toEqual([true, true, true]);
  });
  it("should produce objects with an iterator() method", () => {
    const results = [
      iwrap(TestObjects.newIterator()),
      iwrap(TestObjects.newGenerator()),
      iwrap(TestObjects.newIterable()),
    ];
    expect(results.map(result => typeof result.iterator === "function")).toEqual([true, true, true]);
  });
  describe("iterator()", () => {
    it("should be the generator passed to iwrap", () => {
      const generator = TestObjects.newGenerator();
      const result = iwrap(generator).iterator();
      expect(result).toBe(generator);
    });
    it("should be the iterator passed to iwrap", () => {
      const iterator = TestObjects.newIterator();
      const result = iwrap(iterator).iterator();
      expect(result).toBe(iterator);
    });
    it("should NOT guarantee being the iterable passed to iwrap", () => {
      const iterable = TestObjects.newIterable();
      const result = iwrap(iterable).iterator();
      expect(result).not.toBe(iterable);
    });
  });
  it("should have a property called async", () => {
    expect(iwrap).toHaveProperty("async");
  });
  describe(iwrap.async.name, () => {
    it("should be a function", () => {
      expect(iwrap.async).toBeTypeOf("function");
    });
  });
});