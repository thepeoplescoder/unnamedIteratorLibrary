import { asyncArrayForEach } from "@~main/arrays/operations/asyncArrayForEach";

import { describe, expect, it } from "vitest";
import TestObjects from "@~lib/test/TestObjects";
import typeOf from "@~main/util/types/runtime/typeOf";

describe(asyncArrayForEach.name, () => {
  it("should be an async function", () => {
    const result = typeOf(asyncArrayForEach) === "AsyncFunction";
    expect(result).toBe(true);
  });
  it("should apply asynchronous callbacks similar to sync array forEach", async () => {
    const [appendSync, getTextSync] = TestObjects.createSimpleCallback();
    const [appendAsync, getTextAsync] = TestObjects.createSimpleCallback();

    const array = TestObjects.newArray();

    array.forEach(appendSync);
    await asyncArrayForEach(array, async (v) => appendAsync(v));

    expect(getTextSync()).toEqual(getTextAsync());
  });
});