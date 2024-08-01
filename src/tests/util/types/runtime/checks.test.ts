import {
  isActualObject,
  isIterator,
  isIterable,
  isGenerator,
  isIteratorOrGenerator,
  isAsyncIterator,
  isAsyncGenerator,
  isAsyncGeneratorOrAsyncIterator,
  isPromise,
} from "@~main/util/types/runtime/checks";

import { describe, it } from "vitest";

describe(isActualObject.name, () => { });
describe(isIterator.name, () => { });
describe(isIterable.name, () => { });
describe(isGenerator.name, () => { });
describe(isIteratorOrGenerator.name, () => { });
describe(isAsyncIterator.name, () => { });
describe(isAsyncGenerator.name, () => { });
describe(isAsyncGeneratorOrAsyncIterator.name, () => { });
describe(isPromise.name, () => {
});