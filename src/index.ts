import { runTest } from "./test";

runTest({
  name: "foo",
  fn: t => {
    t.is(1, 3);
  },
  planned: -1,
  timeout: 2000,
});
