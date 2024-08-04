import { ThisArg } from "@~main/util/types/static/ThisArg";
import { AsyncArrayMapCallback } from "../types";

export async function asyncArrayMap<InType, OutType>(
  array: Array<InType>,
  callback: AsyncArrayMapCallback<InType, OutType>,
  ...thisArg: ThisArg
) {
  return await Promise.all(array.map(callback, ...thisArg));
}