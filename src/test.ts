import * as assert from "./assert";
import { AssertionError } from "./error";

export interface TestHandler extends assert.Assertions {
  timeout(ms: number): void;
  done(err?: Error): void;
  plan(count: number): void;
}

export interface GlobalState {
  tests: TestItem[];
}

const ctx: GlobalState = {
  tests: [],
};

export interface TestItem {
  name: string;
  timeout: number;
  planned: number;
  fn(handler: TestHandler): any;
}

export async function runTest(test: TestItem) {
  const start = Date.now();
  let timer: any;
  let done = false;

  function timerFn(resolve: assert.AnyFn) {
    let value;
    if (!done) {
      value = new AssertionError(
        test.timeout,
        Date.now() - start,
        `Test took longer than ${test.timeout}ms`,
      );
    }
    resolve(value);
  }

  let planned = -1;
  return new Promise(async resolve => {
    timer = setTimeout(timerFn, test.timeout, resolve);

    try {
      await test.fn({
        plan(n: number) {
          test.planned = planned = n;
        },
        done() {
          done = true;
        },
        is(a: any, b: any) {
          test.planned--;
          assert.is(a, b);
        },
        throws(fn: assert.AnyFn, err?: Error) {
          test.planned--;
          assert.throws(fn, err || (Error as any));
        },
        timeout(ms: number) {
          test.timeout = ms;
          clearTimeout(timer);
          timer = setTimeout(timerFn, ms, resolve);
        },
      });
      if (test.planned > 0) {
        throw new AssertionError(
          test.planned,
          planned,
          `Expected ${planned} assertions to be called, but ${
            test.planned
          } was called`,
        );
      }
    } catch (err) {
      resolve(err);
    } finally {
      clearTimeout(timer);
    }
  });
}

export function it(name: string, fn: (t: TestHandler) => any) {
  const test: TestItem = {
    fn,
    name,
    planned: -1,
    timeout: 2000,
  };

  ctx.tests.push(test);
}
