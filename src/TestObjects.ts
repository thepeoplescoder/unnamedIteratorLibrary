import { assert } from "vitest";
import { asAsyncIterator } from "./util/convert/toAsyncIterator";

export function createSimpleCallback() {
  let text = "";
  function append(v: any) {
    text += String(v);
  }
  function getText() {
    return text;
  }
  return [append, getText] as [typeof append, typeof getText];
}


export function getNewTestAsyncIterator() {
  return asAsyncIterator(getNewTestIterator());
}

export function* getNewTestGenerator() {
  for (const x of getNewTestIterable()) {
    yield x;
  }
}

export function getNewTestIterator() {
  return getNewTestIterable()[Symbol.iterator]();
}

export function getNewTestIterable() {
  return getNewTestArray();
}

export function getNewTestArray() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assert(array.length >= 5);
  return array;
}

const TestObjects = {
  newArray: getNewTestArray,
  newIterable: getNewTestIterable,
  newIterator: getNewTestIterator,
  newGenerator: getNewTestGenerator,
  newAsyncIterator: getNewTestAsyncIterator,
  createSimpleCallback: createSimpleCallback,
};

export default TestObjects;