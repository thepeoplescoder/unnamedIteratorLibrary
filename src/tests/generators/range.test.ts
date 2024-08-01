import range from "@~main/generators/range";

import { describe, it, expect } from "vitest";
import { isGenerator } from "@~types/runtime/checks";

describe(range.name, () => {
  it("should return a generator when called with 1, 2, or 3 numbers", () => {
    const start = 0, stop = 5, step = 1;
    const ranges = [
      range(stop),
      range(start, stop),
      range(start, stop, step)
    ];
    ranges.forEach(r => expect(r).toSatisfy(isGenerator));
  });
  it("should support describing a range with an object of the form { start?, stop, step? }", () => {
    const start = 0, stop = 5, step = 1;
    const ranges = [
      range({ stop }),
      range({ start, stop }),
      range({ start, stop, step })
    ];
    ranges.forEach(r => expect(r).toSatisfy(isGenerator));
  });
  it("should support negative integers", () => {
    const start = -1, stop = -10, step = -1;
    expect(range({ start, stop, step })).toBeTruthy();
  });
  it("should create a similar generator if called with the same information in number or object form", () => {
    const start = 0, stop = 12, step = 3;
    const pairs = [
      [range(stop), range({ stop })],
      [range(start, stop), range({ start, stop })],
      [range(start, stop, step), range({ start, stop, step })],
    ];
    pairs.forEach(pair => expect(Array.from(pair[0])).toEqual(Array.from(pair[1])));
  });
  it("should not include the stop value", () => {
    const start = 0, stop = 8, step = 2;
    const ranges = [
      range({ stop }),
      range({ start, stop }),
      range({ start, stop, step })
    ];
    const isStopValueIncluded = ((r: typeof ranges[number]) => Array.from(r).includes(stop));
    expect(ranges.map(isStopValueIncluded)).toEqual([false, false, false]);
  });
  it("should set the start value to zero if it is not provided", () => {
    const stop = 5;
    const ranges = [
      range(stop),
      range(-stop),
    ];
    expect(ranges.map(r => Array.from(r)).map(array => array[0])).toEqual([0, 0]);
  });
  it("should terminate immediately if the stop and start values are equal", () => {
    const start = 17, stop = start;
    const r = range(start, stop);
    expect(Array.from(r)).toEqual([]);
  });
  it("should provide a step value that terminates the range (1 or -1) if not provided", () => {
    const start = 5, stop = 13;
    expect(start).toBeLessThan(stop);

    const ranges = [
      range(start, stop),
      range(stop, start),
    ];

    const result = ranges.map(r => Array.from(r)).map(array => array[1] - array[0])
    expect(result).toEqual([1, -1]);
  });
  it("should provide ranges similar to Python's range", () => {
    expect(Array.from(range(5))).toEqual([0, 1, 2, 3, 4]);
    expect(Array.from(range(5, -5, -2))).toEqual([5, 3, 1, -1, -3]);
    expect(Array.from(range(5, 13))).toEqual([5, 6, 7, 8, 9, 10, 11, 12]);
  });
});