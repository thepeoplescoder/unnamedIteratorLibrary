import { ThisArg, bindThisArg } from "../../../util/types/static/ThisArg";

export default function iteratorForEach<T, TReturn = any, TNext = undefined>(
  theIterator: Iterator<T, TReturn, TNext>,
  callback: IteratorForEachCallback<T, TReturn, TNext>,
  ...thisArg: ThisArg
) {
  callback = bindThisArg(callback, ...thisArg);
  for (let index = 0, itResult = theIterator.next(); !itResult.done; index++, itResult = theIterator.next()) {
    callback(itResult.value, index, theIterator);
  }
}

export type IteratorForEachCallback<T, TReturn, TNext> = (value: T, index: number, originalIterator: Iterator<T, TReturn, TNext>) => void;