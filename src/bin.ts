import * as mri from "mri";
// tslint:disable:no-console

const parsed = mri(process.argv.slice(2), {
  boolean: ["coverage"],
  alias: {
    w: "watch",
    h: "help",
    v: "version",
  },
});

if (parsed.help) {
  console.log(`
Commands:
  coverage  Collect code coverage information

Options:
  -w, --watch    Run in watch mode
  -h, --help     Show this help text
  -v, --version  Print version number
`);
  process.exit(0);
}

if (parsed.version) {
  console.log(require("../package.json").version);
  process.exit(0);
}

console.log("parsed", parsed);
