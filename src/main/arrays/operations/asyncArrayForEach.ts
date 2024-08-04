import { bindThisArg, ThisArg } from "@~main/util/types/static/ThisArg";
import { AsyncArrayForEachCallback } from "../types";

export async function asyncArrayForEach<T>(array: Array<T>, callback: AsyncArrayForEachCallback<T>, ...thisArg: ThisArg) {
  callback = bindThisArg(callback, ...thisArg);

  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};