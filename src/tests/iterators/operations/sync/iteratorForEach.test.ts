import iteratorForEach from "@~main/iterators/operations/sync/iteratorForEach";
import TestObjects from "@~lib/test/TestObjects";

import { describe, expect, it } from "vitest";

describe(iteratorForEach.name, () => {
  it("should be a function", () => {
    expect(iteratorForEach).toBeTypeOf("function");
  });
  it("should behave similarly to forEach for arrays", () => {
    const array = TestObjects.newArray();
    const iterator = array[Symbol.iterator]();

    const [append1, getTextFromArray] = TestObjects.createSimpleCallback();
    const [append2, getTextFromIterator] = TestObjects.createSimpleCallback();

    array.forEach(append1);
    iteratorForEach(iterator, append2);

    expect(getTextFromIterator()).toEqual(getTextFromArray());
  });
});