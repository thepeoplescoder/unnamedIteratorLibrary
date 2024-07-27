import { ThisArg, bindThisArg } from "../../../util/types/static/ThisArg";

export default async function* iteratorFilterAsync<T, TReturn = any, TNext = undefined>(
  theIterator: AsyncIterator<T, TReturn, TNext>,
  callback: IteratorFilterAsyncCallbackType<T, TReturn, TNext>,
  ...thisArg: ThisArg
) {
  callback = bindThisArg(callback, ...thisArg);
  for (let index = 0, itResult = await theIterator.next(); !itResult.done; (itResult = await theIterator.next()), index++) {
    if (await callback(itResult.value, index, theIterator)) {
      yield itResult.value;
    }
  }
}

export type IteratorFilterAsyncCallbackType<T, TReturn, TNext> =
  (value: T, index: number, originalIterator: AsyncIterator<T, TReturn, TNext>) => Promise<boolean>;