import { throw_ } from "@thepeoplescoder/throw_";

import iteratorFilterAsync, { IteratorFilterAsyncCallbackType } from "@~iterators/operations/async/iteratorFilterAsync";
import iteratorForEachAsync, { IteratorForEachAsyncCallback } from "@~iterators/operations/async/iteratorForEachAsync";
import iteratorMapAsync, { IteratorMapAsyncCallbackType } from "@~iterators/operations/async/iteratorMapAsync";
import iteratorReduceAsync, { IteratorReduceAsyncCallback } from "@~iterators/operations/async/iteratorReduceAsync";
import { callAsyncIteratorMethod } from "@~util/callIteratorMethod";
import { ThisArg } from "@~types/static/ThisArg";

import WrappedIteratorBase from "./WrappedIteratorBase";

export default class WrappedAsyncIterator<T, TReturn = any, TNext = undefined>
  extends WrappedIteratorBase<T, TReturn, TNext>
  implements AsyncIterator<Awaited<T>, TReturn, TNext>
{
  constructor(x: AsyncIterator<Awaited<T>, TReturn, TNext> | AsyncGenerator<Awaited<T>, TReturn, TNext>) {
    super(x);
  }

  assumeInfinite(value: boolean = true) {
    return super.assumeInfinite(value) as typeof this;
  }

  iterator() {
    return super.iterator() as AsyncIterator<Awaited<T>, TReturn, TNext>;
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  isAsync() {
    return true;
  }

  push(...args: T[]) {
    return super.push(...args) as typeof this;
  }

  async next(...x: [] | [TNext]): Promise<IteratorResult<Awaited<T>, TReturn>> {
    const cached = this.pop() as IteratorResult<Awaited<T>, TReturn>;
    return cached.done ? await this.iterator().next(...x) : cached;
  }

  async return(...value: [] | [TReturn]): Promise<IteratorResult<Awaited<T>, TReturn>> {
    return await callAsyncIteratorMethod(this, "return", ...value);
  }

  async throw(...e: [] | [any]): Promise<IteratorResult<Awaited<T>, TReturn>> {
    return await callAsyncIteratorMethod(this, "throw", ...e);
  }

  map<U>(callback: IteratorMapAsyncCallbackType<Awaited<T>, TReturn, TNext, U>, ...thisArg: ThisArg) {
    return new WrappedAsyncIterator(iteratorMapAsync(this, callback, ...thisArg));
  }

  filter(callback: IteratorFilterAsyncCallbackType<T, TReturn, TNext>, ...thisArg: ThisArg) {
    return new WrappedAsyncIterator(iteratorFilterAsync(this, callback, ...thisArg));
  }

  async reduce<OutType = T>(callback: IteratorReduceAsyncCallback<OutType, T, TReturn, TNext>, ...initialValue: [] | [OutType]): Promise<OutType> {
    return await iteratorReduceAsync(this, callback, ...initialValue);
  }

  async forEach(callback: IteratorForEachAsyncCallback<T, TReturn, TNext>, ...thisArg: ThisArg) {
    await iteratorForEachAsync(this, callback, ...thisArg);
  }

  async collect() {
    return this.isInfinite()
      ? throw_(new TypeError("Cannot collect() an infinite iterator."))
      : await this.reduce(async (result, value) => (result.push(value), result), [] as T[]);
  }

  async collectInto<X>(callback: (x: T[]) => X) {
    return await this.collect().then(callback);
  }

  /** deliberately putting static members in a separate object */
  static statics = {};
};