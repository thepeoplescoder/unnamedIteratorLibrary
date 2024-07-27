import { ThisArg, bindThisArg } from "../../../util/types/static/ThisArg";

export default function* iteratorMap<T, TReturn = any, TNext = undefined, U = any>(
  theIterator: Iterator<T, TReturn, TNext>,
  callback: IteratorMapCallbackType<T, TReturn, TNext, U>,
  ...thisArg: ThisArg
) {
  callback = bindThisArg(callback, ...thisArg);
  for (let index = 0, itResult = theIterator.next(); !itResult.done; (itResult = theIterator.next()), index++) {
    yield callback(itResult.value, index, theIterator);
  }
}

export type IteratorMapCallbackType<T, TReturn, TNext, U> = (value: T, index: number, originalIterator: Iterator<T, TReturn, TNext>) => U;