import { awrap } from "@~main/arrays/awrap";

import { beforeEach, describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";

describe(awrap.name, () => {
  let array: ReturnType<typeof TestObjects.newArray>;

  beforeEach(() => {
    array = TestObjects.newArray();
  });

  it("should be a function", () => {
    expect(awrap).toBeTypeOf("function");
  });
  it("should provide access to the underlying array via the _ property", () => {
    expect(awrap(array)._).toBe(array);
  });
  it("should provide the length of the underlying array via a length property", () => {
    expect(awrap(array).length).toBe(array.length);
  });
  it("should support map/filter/reduce", () => {
    const isEven = (x: number) => x % 2 === 0;
    const squared = (x: number) => x * x;
    const sum = (a: number, b: number) => a + b;

    const result = awrap(array).filter(isEven).map(squared).reduce(sum);
    const expected = array.filter(isEven).map(squared).reduce(sum);

    expect(result).toEqual(expected);
  });
  it("should support async map/filter/reduce", async () => {
    const isEven = (x: number) => x % 2 === 0;
    const squared = (x: number) => x * x;
    const sum = (a: number, b: number) => a + b;

    const isEvenAsync = async (x: number) => isEven(x);
    const squaredAsync = async (x: number) => squared(x);
    const sumAsync = async (a: number, b: number) => sum(a, b);

    const result =
      await (
        await (
          await awrap(array).async().filter(isEvenAsync)
        ).async().map(squaredAsync)
      ).async().reduce(sumAsync);

    const result2 = await awrap(array)
      .async().filter(isEvenAsync)
      .then(x => x.async().map(squaredAsync))
      .then(x => x.async().reduce(sumAsync));

    const result3 = await awrap(array)
      .asyncFilter(isEvenAsync)
      .then(x => x.asyncMap(squaredAsync))
      .then(x => x.asyncReduce(sumAsync));

    const result4 = array.filter(isEven).map(squared).reduce(sum);

    expect(result).toEqual(result2);
    expect(result2).toEqual(result3);
    expect(result3).toEqual(result4);
  });
});