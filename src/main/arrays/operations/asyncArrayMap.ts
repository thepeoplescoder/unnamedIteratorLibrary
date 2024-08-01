import { AsyncArrayMapCallback } from "../types";

export async function asyncArrayMap<InType, OutType>(
  array: Array<InType>,
  callback: AsyncArrayMapCallback<InType, OutType>,
  thisArg?: any
) {
  return await Promise.all(array.map(callback, thisArg));
}