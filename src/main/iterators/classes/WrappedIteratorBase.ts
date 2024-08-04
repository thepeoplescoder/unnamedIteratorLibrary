export default abstract class WrappedIteratorBase<T, TReturn, TNext> {
  private _isAssumedToBeInfinite = false;
  private _iterator: Iterator<T, TReturn, TNext> | AsyncIterator<Awaited<T>, TReturn, TNext>;
  private _stack: T[] = [];

  constructor(iterator: Iterator<T, TReturn, TNext> | AsyncIterator<Awaited<T>, TReturn, TNext>) {
    this._iterator = iterator;
  }

  iterator() {
    return this._iterator;
  }

  public abstract isAsync(): boolean;

  public assumeInfinite(value: boolean = true) {
    this._isAssumedToBeInfinite = value;
    return this;
  }

  public isInfinite() {
    return this._isAssumedToBeInfinite;
  }

  hasReturn(): boolean {
    return this.has("return");
  }

  hasThrow(): boolean {
    return this.has("throw");
  }

  private has(key: keyof (typeof this._iterator)) {
    return typeof this.iterator()[key] === "function";
  }

  push(...args: T[]) {
    this._stack.push(...args);
    return this;
  }

  pop() {
    const result = this._stack.length < 1 ? { done: true } : { value: this._stack.pop() };
    return result as IteratorResult<T, TReturn>;
  }
}