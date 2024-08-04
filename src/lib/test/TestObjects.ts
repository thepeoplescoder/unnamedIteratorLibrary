import { assert } from "vitest";
import { asAsyncIterator } from "@~main/util/convert/asAsyncIterator";

function createSimpleCallback() {
  let strings: string[] = [];
  return [append, getText] as [typeof append, typeof getText];

  function append(v: any) {
    strings.push(String(v));  // we don't want to hold a reference to the original object, to be garbage-collection friendly
  }
  function getText() {
    return strings.join('');
  }
}

function newAsyncIterator() {
  return asAsyncIterator(newIterator());
}

function* newGenerator() {
  for (const x of newIterable()) {
    yield x;
  }
}

function newIterator() {
  return newIterable()[Symbol.iterator]();
}

function newIterable() {
  const array = newArray();
  return {
    [Symbol.iterator]: () => array[Symbol.iterator]()
  };
}

function newArray() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assert(array.length >= 5);
  assert(array.every(x => typeof x === "number"));
  return array;
}

const TestObjects = {
  newArray,
  newIterable,
  newIterator,
  newGenerator,
  newAsyncIterator,
  createSimpleCallback,
};

export default TestObjects;