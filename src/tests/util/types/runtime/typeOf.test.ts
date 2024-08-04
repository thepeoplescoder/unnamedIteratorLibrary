import typeOf from "@~main/util/types/runtime/typeOf";

import { describe, it, expect } from "vitest";

type ReturnTypeOfTypeOf =
| "Undefined"
| "Null"
| "Boolean"
| "Number"
| "BigInt"
| "String"
| "Function"
| "GeneratorFunction"
| "Generator"
| "AsyncFunction"
| "AsyncGeneratorFunction"
| "AsyncGenerator"
| "Object"
| "Array"
| "Symbol"
| "Promise";

type TestType = {
  value: any,
  expected: ReturnTypeOfTypeOf
} & ({
  on: string;
} | {
  for: string;
});

const tests: TestType[] = [
  {value: undefined,                 expected: "Undefined",              on:  "undefined"},
  {value: null,                      expected: "Null",                   on:  "null"},
  {value: true,                      expected: "Boolean",                on:  "true"},
  {value: false,                     expected: "Boolean",                on:  "false"},
  {value: Symbol.iterator,           expected: "Symbol",                 for: "symbols"},
  {value: NaN,                       expected: "Number",                 for: "NaN"},
  {value: Infinity,                  expected: "Number",                 for: "Infinity"},
  {value: 1,                         expected: "Number",                 for: "numbers"},
  {value: 1n,                        expected: "BigInt",                 for: "big integers"},
  {value: "a string",                expected: "String",                 for: "strings"},
  {value: function () {},            expected: "Function",               for: "functions"},
  {value: () => undefined,           expected: "Function",               for: "arrow functions"},
  {value: class X {},                expected: "Function",               for: "classes"},
  {value: function *() {},           expected: "GeneratorFunction",      for: "generator functions"},
  {value: (function *() {})(),       expected: "Generator",              for: "generators"},
  {value: async function () {},      expected: "AsyncFunction",          for: "async functions"},
  {value: async () => undefined,     expected: "AsyncFunction",          for: "async arrow functions"},
  {value: async function *() {},     expected: "AsyncGeneratorFunction", for: "async generator functions"},
  {value: (async function *() {})(), expected: "AsyncGenerator",         for: "async generators"},
  {value: (async function () {})(),  expected: "Promise",                for: "promises"},
  {value: [],                        expected: "Array",                  for: "arrays"},
  {value: {},                        expected: "Object",                 for: "objects"},
  {value: new (class {})(),          expected: "Object",                 for: "objects created with class constructors"},
  {
    value: new (function SomeConstructorFunction() {} as any)(),
    expected: "Object", for: "objects created with constructor functions"
  },
];

describe(typeOf.name, () =>
  tests.forEach(test => it(...shouldBehaveAsDescribedAboveFor(test)))
);

function shouldBehaveAsDescribedAboveFor(test: TestType) {
  const result = typeOf(test.value);

  const onOrForThing = "for" in test
    ? `for ${test.for}`
    : `on ${test.on}`;

  const description = `should return "${test.expected}" ${onOrForThing}`;
  const callback    = () => expect(result).toEqual(test.expected);

  return [description, callback] as [typeof description, typeof callback];
}