import { describe, it, expect } from "vitest";
import typeOf from "../../../../src/util/types/runtime/typeOf";

describe(typeOf.name, () => {
  it("should return \"Undefined\" on undefined", () => {
    expect(typeOf(undefined)).toBe("Undefined");
  });
  it("should return \"Null\" on null", () => {
    expect(typeOf(null)).toBe("Null");
  });
  it("should return \"Boolean\" for true and false", () => {
    const result = [true, false].map(typeOf);
    expect(result).toEqual(["Boolean", "Boolean"]);
  });
  it("should return \"Number\" for NaN", () => {
    expect(typeOf(NaN)).toBe("Number");
  });
  it("should return \"Number\" for Infinity", () => {
    expect(typeOf(Infinity)).toBe("Number");
  });
  it("should return \"Number\" for numbers", () => {
    expect(typeOf(1)).toBe("Number");
  });
  it("should return \"BigInt\" for big integers", () => {
    expect(typeOf(1n)).toBe("BigInt");
  });
  it("should return \"String\" on strings", () => {
    expect(typeOf("this is a string")).toBe("String");
  });
  it("should return \"Function\" on functions", () => {
    function func() { };
    expect(typeOf(func)).toBe("Function");
  });
  it("should return \"Function\" on arrow functions", () => {
    const func = () => undefined;
    expect(typeOf(func)).toBe("Function");
  });
  it("should return \"Function\" on ES6 classes", () => {
    class TestClass { };
    expect(typeOf(TestClass)).toBe("Function");
  });
  it("should return \"GeneratorFunction\" for generator functions", () => {
    function* generatorFunction() { };
    expect(typeOf(generatorFunction)).toBe("GeneratorFunction");
  });
  it("should return \"Generator\" for generators", () => {
    function* generatorFunction() { };
    expect(typeOf(generatorFunction())).toBe("Generator");
  });
  it("should return \"AsyncFunction\" for async functions", async () => {
    async function func() { };
    expect(typeOf(func)).toBe("AsyncFunction");
  });
  it("should return \"AsyncFunction\" for async arrow functions", async () => {
    const func = async () => { };
    expect(typeOf(func)).toBe("AsyncFunction");
  });
  it("should return \"AsyncGeneratorFunction\" for async generator functions", async () => {
    async function* generatorFunction() { };
    expect(typeOf(generatorFunction)).toBe("AsyncGeneratorFunction");
  });
  it("should return \"AsyncGenerator\" for async generators", async () => {
    async function* generatorFunction() { };
    expect(typeOf(generatorFunction())).toBe("AsyncGenerator");
  });
  it("should return \"Object\" for objects created with constructors", () => {
    function SomeConstructorFunction() { };
    expect(typeOf(new SomeConstructorFunction())).toBe("Object");
  });
  it("should return \"Symbol\" for symbols", () => {
    expect(typeOf(Symbol.iterator)).toBe("Symbol");
  });
  it("should return \"Promise\" for promises", async () => {
    async function func() { return 1; };
    const promise = func();
    expect(typeOf(promise)).toBe("Promise");
  });
});