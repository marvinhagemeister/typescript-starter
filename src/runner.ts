import { runTest } from "./test";
import { spawn, ChildProcess } from "child_process";

function removeFromArr<T>(arr: T[], value: T) {
  const idx = arr.indexOf(value);
  if (idx > -1) arr.splice(idx, 1);
}

export async function run(files: string[]) {
  const running: ChildProcess[] = [];
  for (const file of files) {
    try {
      const process = spawn("node", [file]);
      process.on("close", () => removeFromArr(running, process));
      process.on("exit", () => {
        console.log("exited");
        removeFromArr(running, process);
      });
      running.push(process);
    } catch (e) {
      throw e;
    }
  }
}
