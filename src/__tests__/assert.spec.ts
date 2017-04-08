import { assert as t } from "chai";
import {
  assert,
  isPrimitive,
  equal,
  deepEqual,
  is,
  isNot,
  throws,
} from "../assert";

describe("isPrimitive", () => {
  it("should check for primitive", () => {
    t.equal(isPrimitive(undefined), true);
    t.equal(isPrimitive(null), true);
    t.equal(isPrimitive(""), true);
    t.equal(isPrimitive("1"), true);
    t.equal(isPrimitive("a"), true);
    t.equal(isPrimitive(1), true);
    t.equal(isPrimitive(-1), true);

    t.equal(isPrimitive([]), false);
    t.equal(isPrimitive(["asd"]), false);
    t.equal(isPrimitive({}), false);
    t.equal(isPrimitive(() => { /* noop */ }), false);
  });
});

describe("assert", () => {
  it("should return assertion with message", () => {
    t.deepEqual(assert(() => true, 1, 1, "test"), {
      actual: 1,
      expected: 1,
    });
  });

  it("should return assertion with message", () => {
    t.deepEqual(assert(() => false, 1, 1, "test"), {
      actual: 1,
      expected: 1,
      message: "test",
    });
  });
});

describe("equal", () => {
  it("should be equal", () => {
    [undefined, 1, 0, -1, false, true, "foo", () => { /* noop */ }]
      .forEach(v => t.deepEqual(equal(v, v), {
        actual: v,
        expected: v,
      }));
  });

  it("should not be equal", () => {
    [
      [undefined, 0],
      [undefined, null],
      [1, 0],
      [false, true],
      ["foo", "bar"],
      [() => { /* noop */ }, () => { /* noop */ }],
    ]
      .forEach(v => t.equal(
        equal(v[0], v[1]).message !== undefined,
        true,
        ));
  });
});

describe("deepEqual", () => {
  it("should be equal", () => {
    [undefined, 1, 0, -1, false, true, "foo", () => { /* noop */ }]
      .forEach(v => t.deepEqual(deepEqual(v, v), {
        actual: v,
        expected: v,
      }));
  });
});

describe("is", () => {
  it("should work", () => {
    t.equal(is(1, 2).message.length > 0, true);
    t.equal(is(false, true).message.length > 0, true);
    t.equal(is(false, 0).message.length > 0, true);
    t.equal(is(false, null).message.length > 0, true);
    t.equal(is(false, []).message.length > 0, true);
    t.equal(is({} === {}, true).message.length > 0, true);
    t.equal(is([2], [1]).message.length > 0, true);

    t.equal(is({}, {}).message, undefined);
    t.equal(is([], []).message, undefined);
    t.equal(is([{ foo: "bar" }], [{  foo: "bar" }]).message, undefined);
  });
});

describe("isNot", () => {
  it("should work", () => {
    t.equal(isNot(1, 2).message, undefined);
    t.equal(isNot(false, true).message, undefined);
    t.equal(isNot(false, 0).message, undefined);
    t.equal(isNot(false, null).message, undefined);
    t.equal(isNot(false, []).message, undefined);
    t.equal(isNot({} === {}, true).message, undefined);
    t.equal(isNot([2], [1]).message, undefined);

    t.equal(isNot(1, 1).message.length > 0, true);
    t.equal(isNot("foo", "foo").message.length > 0, true);
    t.equal(isNot(null, null).message.length > 0, true);
    t.equal(isNot({}, {}).message.length > 0, true);
    t.equal(isNot([], []).message.length > 0, true);
    t.equal(isNot([{ foo: "bar" }], [{  foo: "bar" }]).message.length > 0, true);

    t.equal(isNot([{ foo: "1" }], [{  foo: "2" }]).message, undefined);
  });
});

describe("throws", () => {
  it("should throw", () => {
    const fn = () => { throw new Error(); };
    t.equal(throws(fn), true);

    const fn2 = () => true;
    t.equal(throws(fn2), false);
  });

  it("should check error instance", () => {
    const fn = () => { throw new TypeError(); };
    t.equal(throws(fn, TypeError), true);
    t.equal(throws(fn, SyntaxError), false);
  });
});
