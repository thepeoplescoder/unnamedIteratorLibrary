import { AsyncArrayForEachCallback } from "../types";

export async function asyncArrayForEach<T>(array: Array<T>, callback: AsyncArrayForEachCallback<T>, thisArg?: any) {
  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};