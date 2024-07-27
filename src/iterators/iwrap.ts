import WrappedIterator from "./classes/WrappedIterator";

export const iwrap = Object.assign(
  function iwrap<T, TReturn = any, TNext = undefined>(...args: ConstructorParameters<typeof WrappedIterator<T, TReturn, TNext>>) {
    return new WrappedIterator<T, TReturn, TNext>(...args);
  },
  WrappedIterator.statics
);