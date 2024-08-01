import { isIteratorOrGenerator } from "@~types/runtime/checks";

export type IteratorOrGenerator<T, TReturn = any, TNext = undefined> = Generator<T, TReturn, TNext> | Iterator<T, TReturn, TNext>;

export function toIterator<T = unknown, TReturn = any, TNext = undefined>(
  x: Iterable<T> | IteratorOrGenerator<T, TReturn, TNext>
) {
  return (
    isIteratorOrGenerator(x) ? x : (x as Iterable<T>)[Symbol.iterator]()
  ) as Iterator<T, TReturn, TNext>;
}