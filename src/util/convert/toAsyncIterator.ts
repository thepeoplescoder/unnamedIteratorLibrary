import { callIteratorMethod } from "../callIteratorMethod";
import { isAsyncGeneratorOrAsyncIterator } from "../types/runtime/checks";

export type AsyncIterators<T, TReturn, TNext> = AsyncIterator<T, TReturn, TNext> | AsyncIterator<Awaited<T>, TReturn, TNext>;
export type AsyncGenerators<T, TReturn, TNext> = AsyncGenerator<T, TReturn, TNext> | AsyncGenerator<Awaited<T>, TReturn, TNext>

/** Converts a NON-ASYNCHRONOUS iterator to an asynchronous one. */
class AsAsyncIterator<T, TReturn = any, TNext = undefined> implements AsyncIterator<T, TReturn, TNext> {
  private _iterator: Iterator<T, TReturn, TNext>;

  constructor(it: Iterator<T, TReturn, TNext>) {
    this._iterator = it;
  }

  asAwaited() {
    return this as AsAsyncIterator<Awaited<T>, TReturn, TNext>;
  }

  iterator() {
    return this._iterator;
  }

  async next(...args: [] | [TNext]) {
    return this._iterator.next(...args);
  }

  async return(...args: [] | [TReturn]) {
    return callIteratorMethod(this._iterator, "return", ...args);
  }

  async throw(...args: [] | [any]) {
    return callIteratorMethod(this._iterator, "throw", ...args);
  }
}

export function asAsyncIterator<T, TReturn = any, TNext = undefined>(
  ...args: ConstructorParameters<typeof AsAsyncIterator<T, TReturn, TNext>>
) {
  return new AsAsyncIterator<T, TReturn, TNext>(...args).asAwaited();
}

export function toAsyncIterator<T, TReturn = any, TNext = undefined>(
  x: Iterator<T, TReturn, TNext> | AsyncIterator<Awaited<T>, TReturn, TNext> | AsyncGenerator<Awaited<T>, TReturn, TNext>
): AsyncIterator<Awaited<T>, TReturn, TNext>
{
  return isAsyncGeneratorOrAsyncIterator(x)
    ? x as AsyncIterator<Awaited<T>, TReturn, TNext>
    : asAsyncIterator(x as Iterator<T, TReturn, TNext>);
}