const kleur = require("kleur");
import * as path from "path";

export const enum ResultType {
  SUCCESS = 1,
  ERROR = 2,
  RUNNING = 3,
}

const SPACE = " ";

export function testCase(status: ResultType, text: string, level: number) {
  level += 2;
  let out = SPACE.repeat(level);

  if (status === ResultType.SUCCESS) {
    out += kleur.green("✓") + " " + kleur.dim(text);
  } else if (status === ResultType.ERROR) {
    out += kleur.bold().red("· " + text);
  }

  return out;
}

export function testFile(status: ResultType, text: string) {
  let out = "";

  if (status === ResultType.SUCCESS) {
    out +=
      kleur
        .bgGreen()
        .bold()
        .black(" PASS ") +
      " " +
      kleur.dim(path.dirname(text) + path.sep) +
      kleur.bold().white(path.basename(text));
  } else if (status === ResultType.ERROR) {
    out +=
      kleur
        .bgRed()
        .bold()
        .black(" FAIL ") +
      " " +
      kleur.bold().red(text);
  }

  return out;
}

// console.log(testCase(ResultType.SUCCESS, "wohoo", 2));
// console.log(testCase(ResultType.ERROR, "wohoo", 2));
// console.log(testCase(ResultType.RUNNING, "wohoo", 2));
// console.log(testFile(ResultType.SUCCESS, "foo/wohoo"));
// console.log(testFile(ResultType.ERROR, "/foo/wohoo"));
// console.log(testFile(ResultType.RUNNING, "/foo/wohoo"));
