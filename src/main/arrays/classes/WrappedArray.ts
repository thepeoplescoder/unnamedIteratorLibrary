import { asyncArrayFilter } from "@~arrays/operations/asyncArrayFilter";
import { asyncArrayForEach } from "@~arrays/operations/asyncArrayForEach";
import { asyncArrayMap } from "@~arrays/operations/asyncArrayMap";
import { asyncArrayReduce } from "@~arrays/operations/asyncArrayReduce";
import { ReduceSignature1, ReduceSignature2 } from "../types";
import { TailOf } from "@~main/util/types/static/tupleTypes";

export default class WrappedArray<T> {
  private _array: Array<T>;

  async(this: WrappedArray<T>) {
    return Object.freeze({
      forEach: this.asyncForEach.bind(this),
      map:     this.asyncMap.bind(this),
      filter:  this.asyncFilter.bind(this),
      reduce:  this.asyncReduce.bind(this),
    });
  }

  constructor(theArray: Array<T>) {
    this._array = theArray;
  }
  get _() {
    return this._array;
  }
  get length() {
    return this._.length;
  }
  trueIndex(index: number) {
    return index >= 0 ? index : this.length + index;
  }

  isInBounds(index: number) {
    return this.isInRawBounds(this.trueIndex(index));
  }

  isInRawBounds(index: number) {
    return 0 <= index && index < this.length;
  }

  unwrap(): typeof this._;
  unwrap(i: number): typeof this._[number];
  unwrap(i?: number): (typeof this._) | (typeof this._)[number] {
    return i === undefined ? this._ : this.at(i);
  }

  at(index: number, ...value: [] | [T]) {
    const trueIndex = this.trueIndex(index);
    return value.length > 0 && this.isInRawBounds(trueIndex)
      ? this._[trueIndex] = value[0] as T
      : this._[trueIndex];
  }

  forEach(...args: Parameters<typeof this._.forEach>): this {
    this._.forEach(...args);
    return this;    // in case you still want to do more processing/transformations afterward.
  }

  map<U>(...args: Parameters<typeof this._.map<U>>) {
    return new WrappedArray(this._.map(...args));
  }

  filter(...args: Parameters<typeof this._.filter>) {
    return new WrappedArray(this._.filter(...args));
  }

  reduce(...args: Parameters<ReduceSignature1<T>>): T;
  reduce<U>(...args: Parameters<ReduceSignature2<T, U>>): U;
  reduce<U = T>(...args: Parameters<ReduceSignature1<T> | ReduceSignature2<T, U>>): U;
  reduce<U = T>(...args: Parameters<ReduceSignature1<T> | ReduceSignature2<T, U>>): U {
    return (this._.reduce as ReduceSignature2<T, U>)
      ( ...args as Parameters<ReduceSignature2<T, U>> ) as unknown as U;
  }

  async asyncForEach(...args: TailOf<Parameters<typeof asyncArrayForEach<T>>>) {
    const [callback, ...thisArg] = args;
    await asyncArrayForEach(this._, callback, ...thisArg);
    return this;
  }

  async asyncFilter(...args: TailOf<Parameters<typeof asyncArrayFilter<T>>>) {
    const [callback, ...thisArg] = args;
    return new WrappedArray(await asyncArrayFilter(this._, callback, ...thisArg));
  }

  async asyncMap<U>(...args: TailOf<Parameters<typeof asyncArrayMap<T, U>>>) {
    const [callback, ...thisArg] = args;
    return new WrappedArray(await asyncArrayMap(this._, callback, ...thisArg));
  }

  async asyncReduce<U = T>(...args: TailOf<Parameters<typeof asyncArrayReduce<T, U>>>) {
    return await asyncArrayReduce(this._, ...args);
  }
}