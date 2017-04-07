import { assert as t } from "chai";
import { assert, isPrimitive, equal, deepEqual } from "../assert";

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
