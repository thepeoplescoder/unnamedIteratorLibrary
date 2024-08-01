import { asyncArrayFilter } from "@~arrays/operations/asyncArrayFilter";
import { asyncArrayForEach } from "@~arrays/operations/asyncArrayForEach";
import { asyncArrayMap } from "@~arrays/operations/asyncArrayMap";
import { ReduceSignature1, ReduceSignature2 } from "../types";

export default class WrappedArray<T> {
  private _array: Array<T>;
  public sync = Object.freeze({
    forEach: this.forEach.bind(this),
    map:     this.map.bind(this),
    filter:  this.filter.bind(this),
    reduce:  this.reduce.bind(this),
  });
  public async = Object.freeze({
    forEach: this.asyncForEach.bind(this),
    map:     this.asyncMap.bind(this),
    filter:  this.asyncFilter.bind(this),
    // reduce: this.asyncReduce.bind(this),
  });

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

  unwrap(): typeof this._;
  unwrap(i: number): typeof this._[number];
  unwrap(i?: number): (typeof this._) | (typeof this._)[number] {
    return i === undefined ? this._ : this.at(i);
  }

  at(index: number) {
    return this._[this.trueIndex(index)];
  }

  forEach(...args: Parameters<typeof this._.forEach>): this {
    this._.forEach(...args);
    return this;
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
    return this._.reduce( ...(args as Parameters<ReduceSignature2<T, U>>) );
  }

  async asyncForEach(...args: TailOf<Parameters<typeof asyncArrayForEach<T>>>) {
    await asyncArrayForEach(this._, ...args);
    return this;
  }

  async asyncFilter(...args: TailOf<Parameters<typeof asyncArrayFilter<T>>>) {
    return new WrappedArray(await asyncArrayFilter(this._, ...args));
  }

  async asyncMap<U>(...args: TailOf<Parameters<typeof asyncArrayMap<T, U>>>) {
    return new WrappedArray(await asyncArrayMap(this._, ...args));
  }
}