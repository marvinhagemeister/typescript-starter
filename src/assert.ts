import * as deepEql from "fast-deep-equal";
import { AssertionError } from "./error";

export type AnyFn<R = any> = (...args: any[]) => R;

export interface Assertions {
  is(a: any, b: any, message?: string): void;
  throws(fn: AnyFn): void;
}

export function is(actual: any, expected: any): void {
  if (actual !== null && typeof actual === "object") {
    if (actual !== expected) {
      throw new AssertionError(
        actual,
        expected,
        `expected ${actual} to equal ${expected}`,
      );
    }
  } else {
    if (!deepEql(actual, expected)) {
      throw new AssertionError(
        actual,
        expected,
        `expected ${actual} to deeply equal ${expected}`,
      );
    }
  }
}

export function throws(fn: AnyFn, error: string | ErrorConstructor) {
  try {
    fn();
    return false;
  } catch (err) {
    if (typeof error === "string") {
      if (!(err as Error).message.includes(error)) {
        throw new AssertionError(
          undefined,
          undefined,
          `Error message did not include "${error}}"`,
        );
      }
    } else {
      if (!(err instanceof error)) {
        throw new AssertionError(
          undefined,
          undefined,
          `Error is not an instance of "${error}}"`,
        );
      }
    }
  }
}
