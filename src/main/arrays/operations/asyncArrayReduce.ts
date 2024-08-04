import { AsyncReduceSignature1, AsyncReduceSignature2 } from "../types";

export async function asyncArrayReduce<T>(theArray: Array<T>, ...args: Parameters<AsyncReduceSignature1<T>>):
  ReturnType<AsyncReduceSignature1<T>>;
export async function asyncArrayReduce<T, U>(theArray: Array<T>, ...args: Parameters<AsyncReduceSignature2<T, U>>):
  ReturnType<AsyncReduceSignature2<T, U>>;
export async function asyncArrayReduce<T, U = T>(
  theArray: Array<T>,
  ...args: Parameters<AsyncReduceSignature1<T>> | Parameters<AsyncReduceSignature2<T, U>>
)
{
  const hasInitialValue                  = args.length > 1;
  const [originalCallback, initialValue] = hasInitialValue ? args : [...args, undefined];
  const actualInitialValue               = hasInitialValue ? initialValue as U : theArray[0];

  return await reduce(actualInitialValue, originalCallback);

  async function reduce(accumulator: typeof actualInitialValue, callback: typeof originalCallback) {
    callback = callback.bind(undefined);
    for (let index = +!hasInitialValue; index < theArray.length; index++) {
      accumulator = await callback(accumulator as T & U, theArray[index], index, theArray);
    }
    return accumulator;
  }
}
