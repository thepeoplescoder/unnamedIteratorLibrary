import { isGenerator, isIterator } from "@~types/runtime/guards";
import { IteratorOrGenerator } from "./toIterator";

export function toGenerator<T, TReturn, TNext>(x: Iterable<T> | IteratorOrGenerator<T, TReturn, TNext>) {
  switch (true) {
    case isGenerator<T, TReturn, TNext>(x):
      return x;
    case isIterator<T, TReturn, TNext>(x):
      return exhaust({ [Symbol.iterator]: () => x as Iterator<T> });
    default:
      return exhaust(x);
  }
}

function* exhaust<T>(iterable: Iterable<T>) {
  for (const thing of iterable) {
    yield thing;
  }
}