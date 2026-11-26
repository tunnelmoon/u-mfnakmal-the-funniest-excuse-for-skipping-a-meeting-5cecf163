import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "I cannot make the standup. I stood up during the last one and nobody noticed for 40 minutes.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");

const written = readFileSync(outFile, "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt does not match the validated line");
}
