import { bindThisArg, ThisArg } from "@~main/util/types/static/ThisArg";
import { AsyncArrayFilterCallback } from "../types";

export async function asyncArrayFilter<T>(array: Array<T>, callback: AsyncArrayFilterCallback<T>, ...thisArg: ThisArg) {
  const result: (typeof array) = [];

  callback = bindThisArg(callback, ...thisArg);

  for (let index = 0; index < array.length; index++) {
    const v = array[index];
    if (await callback(v, index, array)) {
      result.push(v);
    }
  }

  return result;
};