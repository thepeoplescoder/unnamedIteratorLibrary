import * as checks from "./checks";

export function isActualObject(x: any): x is object {
  return checks.isActualObject(x);
}

export function isActualObjectWith(x: any, k: string): x is { [k: string]: any };
export function isActualObjectWith(x: any, k: symbol): x is { [k: symbol]: any };
export function isActualObjectWith(x: any, k: string | symbol): x is { [k: string | symbol]: any };
export function isActualObjectWith(x: any, k: string | symbol): x is { [k: string | symbol]: any } {
  return isActualObject(x) && k in x;
}

export function isIterator<T, TReturn = any, TNext = undefined>(x: any): x is Iterator<T, TReturn, TNext> {
  return isAFunctionProperty(x, "next");
}

export function isIterable<T>(x: any): x is Iterable<T> {
  return isAFunctionProperty(x, Symbol.iterator);
}

function isAFunctionProperty(x: any, k: string | symbol) {
  return isActualObjectWith(x, k) && typeof x[k] === "function";
}

export function isGenerator<T = unknown, TReturn = any, TNext = undefined>(x: any): x is Generator<T, TReturn, TNext> {
  return checks.isGenerator(x);
}

export function isIteratorOrGenerator<T = unknown, TReturn = any, TNext = undefined>(x: any): x is Iterator<T, TReturn, TNext> {
  return checks.isIteratorOrGenerator(x);
}

export function isAsyncIterator<T, TReturn = any, TNext = undefined>(x: any): x is AsyncIterator<T, TReturn, TNext> {
  return checks.isAsyncIterator(x);
}

export function isAsyncGenerator<T = unknown, TReturn = any, TNext = undefined>(x: any): x is AsyncGenerator<T, TReturn, TNext> {
  return checks.isAsyncGenerator(x);
}

export function isAsyncGeneratorOrAsyncIterator<T = unknown, TReturn = any, TNext = undefined>(x: any): x is AsyncIterator<T, TReturn, TNext> {
  return checks.isAsyncGeneratorOrAsyncIterator(x);
}