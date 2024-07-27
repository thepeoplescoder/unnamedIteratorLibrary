import { ThisArg, bindThisArg } from "../../../util/types/static/ThisArg";

export default async function iteratorForEachAsync<T, TReturn = any, TNext = undefined>(
  theIterator: AsyncIterator<T, TReturn, TNext>,
  callback: IteratorForEachAsyncCallback<T, TReturn, TNext>,
  ...thisArg: ThisArg
) {
  callback = bindThisArg(callback, ...thisArg);
  for (let index = 0, itResult = await theIterator.next(); !itResult.done; index++, itResult = await theIterator.next()) {
    await callback(itResult.value, index, theIterator);
  }
}

export type IteratorForEachAsyncCallback<T, TReturn, TNext> =
  (value: T, index: number, originalIterator: AsyncIterator<T, TReturn, TNext>) => Promise<void>;