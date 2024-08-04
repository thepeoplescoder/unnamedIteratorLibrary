import { asyncArrayMap } from "@~main/arrays/operations/asyncArrayMap";

import { describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";
import typeOf from "@~main/util/types/runtime/typeOf";

describe(asyncArrayMap.name, () => {
  it("should be an async function", () => {
    const result = typeOf(asyncArrayMap) === "AsyncFunction";
    expect(result).toBe(true);
  });
  it("should apply asynchronous callbacks similar to sync array map", async () => {
    const array = TestObjects.newArray();

    const func = (x: typeof array[number]) => (x + x);

    const result = await asyncArrayMap(array, async (x) => func(x));
    const expected = array.map(func);

    expect(result).toEqual(expected);
  });
});