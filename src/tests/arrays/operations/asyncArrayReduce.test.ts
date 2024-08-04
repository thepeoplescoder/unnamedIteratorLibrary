import { asyncArrayReduce } from "@~main/arrays/operations/asyncArrayReduce";

import { describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";
import typeOf from "@~main/util/types/runtime/typeOf";

describe(asyncArrayReduce.name, () => {
  it("should be an async function", () => {
    const result = typeOf(asyncArrayReduce) === "AsyncFunction";
    expect(result).toBe(true);
  });
  it("should apply asynchronous callbacks similar to sync array reduce", async () => {
    const array = TestObjects.newArray();
    const reducer = (a: typeof array[number], b: typeof array[number]) => (a + b);

    const expected = array.reduce(reducer);
    const result   = await asyncArrayReduce(array, async (a, b) => reducer(a, b));

    expect(result).toEqual(expected);
  });
});