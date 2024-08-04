import { AsyncGenerators, AsyncIterators } from "@~main/util/convert/asAsyncIterator";
import { ThisArg, bindThisArg } from "@~types/static/ThisArg";

export default async function* iteratorMapAsync<T, TReturn = any, TNext = undefined, U = any>(
  theIterator: AsyncIterators<T, TReturn, TNext> | AsyncGenerators<T, TReturn, TNext>,
  callback: IteratorMapAsyncCallbackType<T, TReturn, TNext, U>,
  ...thisArg: ThisArg
) {
  callback = bindThisArg(callback, ...thisArg);
  for (let index = 0, itResult = await theIterator.next(); !itResult.done; index++, itResult = await theIterator.next()) {
    yield await callback(itResult.value, index, theIterator);
  }
}

export type IteratorMapAsyncCallbackType<T, TReturn, TNext, U> =
  (value: T, index: number, originalIterator: AsyncIterator<T, TReturn, TNext>) => Promise<U>;