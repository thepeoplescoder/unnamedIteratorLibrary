import TestObjects from "@~lib/test/TestObjects";
import { isActualObjectWith, isIterator, isIterable } from "@~main/util/types/runtime/guards";

import { describe, expect, it } from "vitest";

describe(isActualObjectWith.name, () => {
  const obj = Object.freeze({ x: 15, y: 27, z: 4 });

  it("should be a function", () => {
    expect(isActualObjectWith).toBeTypeOf("function");
  });
  it("should return true if the requested key exists on the object", () => {
    Object.keys(obj).forEach(key => expect(isActualObjectWith(obj, key)).toBe(true));
  });
  it("should return false if the requested key does not exist on the object", () => {
    const nonExistentKey = Object.keys(obj).join('');
    expect(isActualObjectWith(obj, nonExistentKey)).toBe(false);
  });
});

describe(isIterator.name, () => {
  it("should be a function", () => {
    expect(isIterator).toBeTypeOf("function");
  });
  it("should return true if the object is likely to be an iterator", () => {
    const result = [TestObjects.newIterator(), TestObjects.newGenerator()].map(isIterator);
    expect(result).toEqual([true, true]);
  });
  it("should return false if the object is definitely not an iterator", () => {
    const result = isIterator(TestObjects.newArray());
    expect(result).toBe(false);
  })
});

describe(isIterable.name, () => {
  it("should be a function", () => {
    expect(isIterable).toBeTypeOf("function");
  });
  it("should return true if the argument received is an iterable object", () => {
    const result = [TestObjects.newIterable(), TestObjects.newArray()].map(isIterable);
    expect(result).toEqual([true, true]);
  });
});