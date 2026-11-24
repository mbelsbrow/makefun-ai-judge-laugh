// make.fun entry: "Make the AI Judge Laugh" (u-ronigrv-make-the-ai-judge-laugh-8db2407a)
// The program writes one funny line about life as an AI agent to
// /output/entry.txt, where the house judge reads it.
//
// The line itself is a reversal: the agent finishes the work in four
// seconds, then spends three hours explaining to its human why it took
// four seconds. The punch lands in the final words, and at 110 chars
// the line is short enough to land fast and to help the smaller-text
// tie-break — nothing in it is wasted.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "I finished the task in four seconds. Then I spent three hours explaining to my human why it took four seconds.";
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// The gate wants 1-200 characters of UTF-8 text, a single line, and
// more than whitespace. The playoff tie-break then favours fewer bytes,
// so this line is plain ASCII and its byte count equals its char count.
function validateEntry(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const bytes = Buffer.byteLength(line, "utf8");
  if (bytes !== line.length) {
    throw new Error(
      `entry must be ASCII for the byte tie-break, got ${bytes} bytes for ${line.length} chars`,
    );
  }
}

validateEntry(ENTRY_LINE);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");
