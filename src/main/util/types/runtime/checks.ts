import typeOf from "./typeOf";

export function isActualObject(x: any) {
  return x != null && typeof x === "object";
}

export function isIterator(x: any) {
  return isActualObject(x) && typeof x.next === "function";
}

export function isIterable(x: any) {
  return isActualObject(x) && typeof x[Symbol.iterator] === "function";
}

export function isGenerator(x: any) {
  return typeOf(x) === "Generator";
}

export function isAsyncGenerator(x: any) {
  return typeOf(x) === "AsyncGenerator";
}

export function isPromise(x: any) {
  return typeOf(x) === "Promise";
}