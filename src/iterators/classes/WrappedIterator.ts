import iteratorFilter, { IteratorFilterCallbackType } from "../operations/sync/iteratorFilter";
import iteratorForEach, { IteratorForEachCallback } from "../operations/sync/iteratorForEach";
import iteratorMap, { IteratorMapCallbackType } from "../operations/sync/iteratorMap";
import iteratorReduce, { IteratorReduceCallback } from "../operations/sync/iteratorReduce";
import { callIteratorMethod } from "../../util/callIteratorMethod";
import { asAsyncIterator } from "../../util/convert/toAsyncIterator";
import { toIterator, IteratorOrGenerator } from "../../util/convert/toIterator";
import { throw_ } from "@thepeoplescoder/throw_";
import { ThisArg } from "../../util/types/static/ThisArg";
import WrappedAsyncIterator from "./WrappedAsyncIterator";
import WrappedIteratorBase from "./WrappedIteratorBase";
import iteratorChain from "../operations/sync/iteratorChain";

export default class WrappedIterator<T, TReturn = any, TNext = undefined>
  extends WrappedIteratorBase<T, TReturn, TNext>
  implements Iterator<T, TReturn, TNext>
{
  constructor(x: Iterable<T> | IteratorOrGenerator<T, TReturn, TNext>) {
    super(toIterator(x));
  }

  assumeInfinite(value: boolean = true) {
    return super.assumeInfinite(value) as typeof this;
  }

  iterator() {
    return super.iterator() as Iterator<T, TReturn, TNext>;
  }

  [Symbol.iterator]() {
    return this;
  }

  push(...args: T[]) {
    return super.push(...args) as typeof this;
  }

  next(...x: [] | [TNext]): IteratorResult<T, TReturn> {
    const cached = this.pop();
    return cached.done ? this.iterator().next(...x) : cached;
  }

  return(...value: [] | [TReturn]): IteratorResult<T, TReturn> {
    return callIteratorMethod(this, "return", ...value);
  }

  throw(...e: [] | [any]): IteratorResult<T, TReturn> {
    return callIteratorMethod(this, "throw", ...e);
  }

  chain(...args: Parameters<typeof iteratorChain<T, TReturn, TNext>>) {
    return new WrappedIterator(iteratorChain<T, TReturn, TNext>(this, ...args));
  }

  map<U, UReturn = TReturn, UNext = TNext>(callback: IteratorMapCallbackType<T, TReturn, TNext, U>, ...thisArg: ThisArg): WrappedIterator<U, UReturn, UNext> {
    return new WrappedIterator<U, UReturn, UNext>(iteratorMap(this, callback, ...thisArg));
  }

  filter(callback: IteratorFilterCallbackType<T, TReturn, TNext>, ...thisArg: ThisArg): WrappedIterator<T, TReturn, TNext> {
    return new WrappedIterator<T, TReturn, TNext>(iteratorFilter(this, callback, ...thisArg));
  }

  reduce<OutType = T>(callback: IteratorReduceCallback<OutType, T, TReturn, TNext>, ...initialValue: [] | [OutType]): OutType {
    return iteratorReduce(this, callback, ...initialValue);
  }

  forEach(callback: IteratorForEachCallback<T, TReturn, TNext>, ...thisArg: ThisArg) {
    iteratorForEach(this, callback, ...thisArg);
  }

  collect(): T[] {
    return this.isInfinite() ? throw_(new TypeError("Cannot collect() an infinite iterator.")) : [...this];
  }

  collectInto<X>(callback: (x: T[]) => X) {
    return callback(this.collect());
  }

  async() {
    return new WrappedAsyncIterator(asAsyncIterator(this));
  }

  /** deliberately putting static members in a separate object */
  static statics = {
    async: Object.assign(
      function async<T, TReturn = any, TNext = undefined>(...args: ConstructorParameters<typeof WrappedAsyncIterator<T, TReturn, TNext>>) {
        return new WrappedAsyncIterator<T, TReturn, TNext>(...args);
      },
      WrappedAsyncIterator.statics
    ),
  };
};