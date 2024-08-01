import { AsyncReduceCallback2, AsyncReduceSignature1, AsyncReduceSignature2, AsyncReduceSignature3 } from "../types";

export async function asyncArrayReduce<T>(theArray: Array<T>, ...args: Parameters<AsyncReduceSignature1<T>>):
  ReturnType<AsyncReduceSignature1<T>>;
export async function asyncArrayReduce<T>(theArray: Array<T>, ...args: Parameters<AsyncReduceSignature2<T>>):
  ReturnType<AsyncReduceSignature2<T>>;
export async function asyncArrayReduce<T, U>(theArray: Array<T>, ...args: Parameters<AsyncReduceSignature3<T, U>>):
  ReturnType<AsyncReduceSignature3<T, U>>;
export async function asyncArrayReduce<T, U = T>(
  theArray: Array<T>,
  ...args: Parameters<AsyncReduceSignature1<T>> | Parameters<AsyncReduceSignature2<T>> | Parameters<AsyncReduceSignature3<T, U>>
)
{
  const [callback, initialValue] = args;
  const hasInitialValue = (function (x: any): x is AsyncReduceCallback2<T, U> {
    return args.length > 1;
  })(callback);

  let accumulator = hasInitialValue ? initialValue : theArray[0];

  accumulator = await reduce(theArray);

  return hasInitialValue
    ? accumulator as U
    : accumulator as T;

  async function reduce(ara: T[]) {
    for (let index = +!hasInitialValue; index < ara.length; index++) {
      accumulator = await callback(accumulator as unknown as Awaited<T> & Awaited<U>, ara[index], index, ara);
    }
    return accumulator;
  }
}
