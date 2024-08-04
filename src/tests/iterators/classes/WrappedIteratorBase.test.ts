import WrappedIteratorBase from "@~main/iterators/classes/WrappedIteratorBase";
import WrappedIterator from "@~main/iterators/classes/WrappedIterator";

import { beforeEach, describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";

describe(WrappedIteratorBase.name, () => {
  let iterator: Iterator<number>;
  let wrappedIterator: WrappedIterator<number, any, any>;
  let wrappedIteratorBase: WrappedIteratorBase<number, any, any>;

  beforeEach(() => {
    iterator = TestObjects.newIterator();
    wrappedIterator = new WrappedIterator(iterator);
    wrappedIteratorBase = wrappedIterator;
  });

  it("should be a function", () => {
    expect(WrappedIteratorBase).toBeTypeOf("function");
  });
  it(`should be possible to test this class using a ${WrappedIterator.name}`, () => {
    expect(wrappedIterator).toBeInstanceOf(WrappedIteratorBase);
  });

  describe("iterator", () => {
    it("should be a function", () => {
      expect(wrappedIteratorBase.iterator).toBeTypeOf("function");
    });
    it("should expose the original iterator", () => {
      expect(wrappedIteratorBase.iterator()).toBe(iterator);
    });
  });

  describe("isInfinite", () => {
    it("should be a function", () => {
      expect(wrappedIteratorBase.isInfinite).toBeTypeOf("function");
    });
    it("should determine if an iterator should be assumed infinite, false by default", () => {
      expect(wrappedIteratorBase.isInfinite()).toBe(false);
    });
  });

  describe("assumeInfinite", () => {
    it("should be a function", () => {
      expect(wrappedIteratorBase.assumeInfinite).toBeTypeOf("function");
    });
    it("should return itself to allow chaining", () => {
      expect(wrappedIteratorBase.assumeInfinite()).toBe(wrappedIteratorBase);
    });
    it("should assume an iterator is infinite if called with no arguments", () => {
      expect(wrappedIteratorBase.isInfinite()).toBe(false);
      wrappedIteratorBase.assumeInfinite();
      expect(wrappedIteratorBase.isInfinite()).toBe(true);
    });
    it("should be able to explicitly set the assumption using an argument", () => {
      expect(wrappedIteratorBase.isInfinite()).toBe(false);
      wrappedIteratorBase.assumeInfinite();
      expect(wrappedIteratorBase.isInfinite()).toBe(true);
      wrappedIteratorBase.assumeInfinite(false);
      expect(wrappedIteratorBase.isInfinite()).toBe(false);
    });
  });

  describe("isAsync", () => {
    it("should be a function", () => {
      expect(wrappedIteratorBase.isAsync).toBeTypeOf("function");
    });
    it("should return false if we are in sync mode", () => {
      expect(wrappedIteratorBase.isAsync()).toBe(false);
    });
    it("should return true if we are in async mode", () => {
      expect(wrappedIterator).toBe(wrappedIteratorBase);
      expect(wrappedIterator.async().isAsync()).toBe(true);
    });
  });

  describe("hasReturn", () => {
    it("should be a function", () => {
      expect(wrappedIteratorBase.hasReturn).toBeTypeOf("function");
    });
    it("should match whether the underlying iterator has a return method or not", () => {
      expect(wrappedIteratorBase.hasReturn()).toBe("return" in wrappedIteratorBase.iterator());
    });
  });

  describe("hasThrow", () => {
    it("should be a function", () => {
      expect(wrappedIteratorBase.hasThrow).toBeTypeOf("function");
    });
    it("should match whether the underlying iterator has a throw method or not", () => {
      expect(wrappedIteratorBase.hasThrow()).toBe("throw" in wrappedIteratorBase.iterator());
    });
  });

  describe("push and pop", () => {
    it("should both be functions", () => {
      expect(wrappedIteratorBase.push).toBeTypeOf("function");
      expect(wrappedIteratorBase.pop).toBeTypeOf("function");
    });
    it("pop should undo push", () => {
      const testValue = 123456789;

      wrappedIteratorBase.push(testValue);
      const iteratorResult = wrappedIteratorBase.pop();

      expect(iteratorResult.done).toBeFalsy();
      expect(iteratorResult.value).toEqual(testValue);
    });
  });
});