import { toGenerator } from "@~util/convert/toGenerator";

export default function* iteratorChain<T, TReturn = any, TNext = undefined>(
  ...iterators: (Iterable<T> | Iterator<T, TReturn, TNext> | Generator<T, TReturn, TNext>)[]
) {
  for (const x of iterators) {
    yield* toGenerator(x);
  }
}

export type IteratorMapCallbackType<T, TReturn, TNext, U> = (value: T, index: number, originalIterator: Iterator<T, TReturn, TNext>) => U;