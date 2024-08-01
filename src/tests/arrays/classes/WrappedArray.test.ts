import WrappedArray from "@~main/arrays/classes/WrappedArray";

import { describe, it, expect, beforeEach } from "vitest";
import TestObjects from "@~test/lib/TestObjects";

describe(WrappedArray.name, () => {
  let array: ReturnType<typeof TestObjects.newArray>; 
  let wrappedArray: WrappedArray<typeof array[number]>;

  beforeEach(() => {
    array        = TestObjects.newArray();
    wrappedArray = new WrappedArray(array);
  });

  it("should be a constructor function", () => {
    expect(WrappedArray).toBeTypeOf("function");
    expect(Object.getPrototypeOf(wrappedArray)).not.toBe(Object.prototype);
    expect(wrappedArray).toBeInstanceOf(WrappedArray);
  });

  describe(`${WrappedArray.name} instances`, () => {
    it("should expose the original array through a property called _", () => {
      expect(wrappedArray._).toBe(array);
    });

    it("should have a length property that matches the length of the original array", () => {
      expect(wrappedArray.length).toEqual(wrappedArray._.length);
    });

    it("should have a method called trueIndex", () => {
      expect(wrappedArray.trueIndex).toBeTypeOf("function");
    });
    describe(WrappedArray.prototype.trueIndex.name, () => {
      it("should let regular index values pass through", () => {
        const index = 0;
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(wrappedArray.length);
        expect(wrappedArray.trueIndex(index)).toBe(index);
      });
      it("should support Python-style negative indices", () => {
        const index = -1;
        expect(index).toBeLessThan(0);
        expect(index + wrappedArray.length).toBeGreaterThanOrEqual(0);
        expect(wrappedArray.trueIndex(index)).toBe(wrappedArray.length + index);
      });
    });

    it("should have an indexing method called at", () => {
      expect(wrappedArray.at).toBeTypeOf("function");
    });
    describe(WrappedArray.prototype.at.name, () => {
      it("should work like regular array indexing with normal indices", () => {
        const index = 4;
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(wrappedArray.length);
        expect(wrappedArray.at(index)).toEqual(wrappedArray._[index]);
      });
      it("should support negative indices, starting from the last element", () => {
        const index = -4;
        expect(index).toBeLessThan(0);
        expect(index + wrappedArray.length).toBeGreaterThanOrEqual(0);
        expect(wrappedArray.at(index)).toEqual(wrappedArray._[wrappedArray.length + index]);
      })
    });

    it("should have a method called unwrap", () => {
      expect(wrappedArray.unwrap).toBeTypeOf("function");
    });
    describe(WrappedArray.prototype.unwrap.name, () => {
      it("should be equivalent to the _ property when called with zero arguments", () => {
        expect( wrappedArray.unwrap() ).toBe( wrappedArray._ );
      });
      it("should be equivalent to the at method when called with an argument", () => {
        const index = 5;
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(wrappedArray.length);
        expect( wrappedArray.unwrap(index) ).toEqual( wrappedArray.at(index) );
      });
    });

    it("should support map", () => {
      const plusOne = ((x: typeof array[number]) => x + 1);
      expect(  wrappedArray.map(plusOne).unwrap()  ).toEqual(  array.map(plusOne)  );
    });

    it("should support filter", () => {
      const isEven = ((x: typeof array[number]) => x % 2 === 0);
      expect(  wrappedArray.filter(isEven).unwrap()  ).toEqual(  array.filter(isEven)  );
    });

    it("should support reduce", () => {
      const sumReducer = ((a: typeof array[number], b: typeof array[number]) => a + b);
      expect(  wrappedArray.reduce(sumReducer)  ).toEqual(  array.reduce(sumReducer)  );
    });

    it("should support forEach", () => {
      const [arrayAppend, arrayGetText] = TestObjects.createSimpleCallback();
      const [wrappedArrayAppend, wrappedArrayGetText] = TestObjects.createSimpleCallback();

      wrappedArray._.forEach(arrayAppend);
      wrappedArray.forEach(wrappedArrayAppend);

      expect(  wrappedArrayGetText()  ).toEqual(  arrayGetText()  );
    });

    it("should support asyncMap", async () => {
      const plusOne = ((x: typeof array[number]) => x + 1);
      const result = await wrappedArray.asyncMap(async (x) => plusOne(x)).then(x => x._);
      const expected = wrappedArray._.map(plusOne);
      expect(result).toEqual(expected);
    });
    it("should support asyncFilter", async () => {
      const isEven = ((x: typeof array[number]) => x % 2 === 0);
      const result = await wrappedArray.asyncFilter(async (x) => isEven(x)).then(x => x._);
      const expected = wrappedArray._.filter(isEven);
      expect(result).toEqual(expected);
    });
    it("should support asyncReduce", async () => {
      const sumReducer = ((a: typeof array[number], b: typeof array[number]) => a + b);
      const result = await wrappedArray.asyncReduce(async (acc, curr) => sumReducer(acc, curr));
      const expected = wrappedArray._.reduce(sumReducer);
      expect(result).toEqual(expected);
    });
    it("should support asyncForEach", async () => {
      const [append1, getText1] = TestObjects.createSimpleCallback();
      const [append2, getText2] = TestObjects.createSimpleCallback();
      await wrappedArray.asyncForEach(async (v) => append1(v));
      wrappedArray._.forEach(v => append2(v));
      expect(getText1()).toEqual(getText2());
    });
  });
});