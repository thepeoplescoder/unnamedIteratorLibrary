import { AsyncArrayFilterCallback } from "../types";

export async function asyncArrayFilter<T>(array: Array<T>, callback: AsyncArrayFilterCallback<T>, thisArg?: any) {
  const result: (typeof array) = [];

  if (thisArg !== undefined) {
    callback = callback.bind(thisArg);
  }
  for (let index = 0; index < array.length; index++) {
    const v = array[index];
    if (await callback(v, index, array)) {
      result.push(v);
    }
  }

  return result;
};