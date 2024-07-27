import { throw_ } from "@thepeoplescoder/throw_";

export default function iteratorReduce<OutType, T, TReturn = any, TNext = undefined>(
  theIterator: Iterator<T, TReturn, TNext>,
  callback: IteratorReduceCallback<OutType, T, TReturn, TNext>,
  ...initialValue: [] | [OutType]
) {
  let index = 0;

  const setInitialValueToNextItemInIterator = (nextIteratorResult: IteratorResult<T, TReturn>) => nextIteratorResult.done
    ? throw_(new TypeError("Reduce of empty iterator with no initial value"))
    : (index++, nextIteratorResult.value);

  let accumulator = (
    initialValue.length > 0
      ? initialValue[0]
      : setInitialValueToNextItemInIterator(theIterator.next())
  ) as OutType;

  callback = callback.bind(undefined);    // See behavior for Array.prototype.reduce.

  for (let itResult = theIterator.next(); !itResult.done; index++, itResult = theIterator.next()) {
    accumulator = callback(accumulator, itResult.value, index, theIterator);
  }

  return accumulator;
}

export type IteratorReduceCallback<OutType, T, TReturn, TNext> =
  (accumulator: OutType, value: T, index: number, originalIterator: Iterator<T, TReturn, TNext>) => OutType;