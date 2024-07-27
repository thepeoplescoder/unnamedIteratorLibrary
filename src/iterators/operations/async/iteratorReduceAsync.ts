import { throw_ } from "@thepeoplescoder/throw_";

export default async function iteratorReduceAsync<OutType, T, TReturn = any, TNext = undefined>(
  theIterator: AsyncIterator<T, TReturn, TNext>,
  callback: IteratorReduceAsyncCallback<OutType, T, TReturn, TNext>,
  ...initialValue: [] | [OutType]
) {
  let index = 0;

  const setInitialValueToNextItemInIterator = (nextIteratorResult: IteratorResult<T, TReturn>) => nextIteratorResult.done
    ? throw_(new TypeError("Reduce of empty iterator with no initial value"))
    : (index++, nextIteratorResult.value);

  let accumulator = (
    initialValue.length > 0
      ? initialValue[0]
      : setInitialValueToNextItemInIterator(await theIterator.next())
  ) as OutType;

  callback = callback.bind(undefined);    // see behavior for Array.prototype.reduce.

  for (let itResult = await theIterator.next(); !itResult.done; index++, itResult = await theIterator.next()) {
    accumulator = await callback(accumulator, itResult.value, index, theIterator);
  }

  return accumulator;
}

export type IteratorReduceAsyncCallback<OutType, T, TReturn, TNext> = (
  accumulator: OutType,
  value: T,
  index: number,
  originalIterator: AsyncIterator<T, TReturn, TNext>
) => Promise<OutType>;