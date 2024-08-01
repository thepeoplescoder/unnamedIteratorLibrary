import WrappedArray from "./classes/WrappedArray";

export function awrap<T>(...args: ConstructorParameters<typeof WrappedArray<T>>) {
  return new WrappedArray<T>(...args);
}