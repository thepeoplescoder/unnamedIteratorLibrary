import { ThisArg, bindThisArg } from "@~util/types/static/ThisArg";

export default function* iteratorFilter<T, TReturn = any, TNext = undefined>(
  theIterator: Iterator<T, TReturn, TNext>,
  callback: IteratorFilterCallbackType<T, TReturn, TNext>,
  ...thisArg: ThisArg
) {
  callback = bindThisArg(callback, ...thisArg);
  for (let index = 0, itResult = theIterator.next(); !itResult.done; (itResult = theIterator.next()), index++) {
    if (callback(itResult.value, index, theIterator)) {
      yield itResult.value;
    }
  }
}

export type IteratorFilterCallbackType<T, TReturn, TNext> = (value: T, index: number, originalIterator: Iterator<T, TReturn, TNext>) => boolean;