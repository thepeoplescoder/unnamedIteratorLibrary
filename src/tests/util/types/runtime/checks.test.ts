import TestObjects from "@~lib/test/TestObjects";
import {
  isActualObject,
  isIterator,
  isIterable,
  isGenerator,
  isAsyncGenerator,
  isPromise,
} from "@~main/util/types/runtime/checks";

import { describe, expect, it, test } from "vitest";

describe(isActualObject.name, () => {
  it("should be a function", () => {
    expect(isActualObject).toBeTypeOf("function");
  });
  it("should return false on null", () => {
    const result = isActualObject(null);
    expect(result).toBe(false);
  });
  it("should return false on undefined", () => {
    const result = isActualObject(undefined);
    expect(result).toBe(false);
  });
  it("should return true for objects", () => {
    const result = isActualObject({ key: "some value" });
    expect(result).toBe(true);
  });
});

describe(isIterator.name, () => {
  it("should be a function", () => {
    expect(isIterator).toBeTypeOf("function");
  });
  it("should return true if given an iterator", () => {
    const result = isIterator(TestObjects.newIterator());
    expect(result).toBe(true);
  });
});

describe(isIterable.name, () => {
  it("should be a function", () => {
    expect(isIterable).toBeTypeOf("function");
  });
  it("should return true if given an iterable", () => {
    const result = isIterable(TestObjects.newIterable());
    expect(result).toBe(true);
  });
});

describe(isGenerator.name, () => {
  it("should be a function", () => {
    expect(isGenerator).toBeTypeOf("function");
  });
  it("should return true if given a generator", () => {
    const result = isGenerator(TestObjects.newGenerator());
    expect(result).toBe(true);
  });
  it("should return false if given an iterator only with next()", () => {
    const result = isGenerator(TestObjects.newIterator());
    expect(result).toBe(false);
  });
});

describe("generators", () => {
  it("should be iterators", () => {
    const result = isIterator(TestObjects.newGenerator());
    expect(result).toBe(true);
  });
});

describe("iterators", () => {
  test("are not necessarily generators", () => {
    const result = isGenerator(TestObjects.newIterator());
    expect(result).toBe(false);
  });
});

describe(isAsyncGenerator.name, () => {
  it("should be a function", () => {
    expect(isAsyncGenerator).toBeTypeOf("function");
  });
  it("should return true for async generators", async () => {
    const generatorFunction = async function *() {};
    const result = isAsyncGenerator(generatorFunction());
    expect(result).toBe(true);
  });
});

describe(isPromise.name, () => {
  it("should be a function", () => {
    expect(isPromise).toBeTypeOf("function");
  });
  it("should return true for promises", async () => {
    const asyncFunction = async function () {};
    const promise1      = asyncFunction();
    const result1       = isPromise(promise1);
    expect(result1).toBe(true);

    const promise2 = Promise.resolve(1);
    const result2  = isPromise(promise2);
    expect(result2).toBe(true);
  });
});