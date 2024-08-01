import { assert } from "vitest";
import { asAsyncIterator } from "@~util/convert/toAsyncIterator";

function createSimpleCallback() {
  let text = "";
  function append(v: any) {
    text += String(v);
  }
  function getText() {
    return text;
  }
  return [append, getText] as [typeof append, typeof getText];
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
  return {
    [Symbol.iterator]: () => newArray()[Symbol.iterator]()
  };
}

function newArray() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  assert(array.length >= 5);
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