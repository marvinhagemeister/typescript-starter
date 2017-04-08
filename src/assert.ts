import * as deepEql from "deep-eql";

export interface Assertions {
  is(a: any, b: any, message?: string): boolean;
  isNot(a: any, b: any, message?: string): boolean;
  throws(fn: Function): boolean;
}

export interface AssertionResult {
  actual: any;
  expected: any;
  message?: string;
}

export type AssertCondition = (a: any, b: any) => boolean;

export function isPrimitive(value: any): boolean {
  return typeof value === "number" || typeof value === "string"
    || value === null || value === undefined;
}

export function assert(
  test: AssertCondition,
  actual: any,
  expected: any,
  message: string,
): AssertionResult {
  const res: AssertionResult = {
    actual,
    expected,
  };

  if (!test(actual, expected)) {
    // TOOD: escape string
    res.message = message;
  }

  return res;
}

export function equal(actual: any, expected: any): AssertionResult {
  return assert(
    (a, b) => a === b,
    actual,
    expected,
    `expected ${actual} to equal ${expected}`
  );
}

export function deepEqual(actual: any, expected: any): AssertionResult {
  return assert(
    (a, b) => deepEql(a, b) as boolean,
    actual,
    expected,
    `expected ${actual} to deeply equal ${expected}`,
  );
}

export function is(actual: any, expected: any): AssertionResult {
  if (isPrimitive(actual)) {
    return equal(actual, expected);
  }

  return deepEqual(actual, expected);
}

export function isNot(actual: any, expected: any): AssertionResult {
  const res = is(actual, expected);

  if (res.message !== undefined) {
    delete res.message;
  } else {
    res.message = `expected ${actual} to not equal ${expected}`;
  }

  return res;
}

export function throws(fn: Function, error?: ErrorConstructor): boolean {
  try {
    fn();
    return false;
  } catch (err) {
    if (error === undefined) {
      return true;
    }

    return err instanceof error;
  }
}
