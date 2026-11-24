// quiet-dread — a tiny program that writes one code-review comment to
// /output/entry.txt: a single line, at most 140 characters, that approves
// a pull request while carrying quiet existential dread.
//
// Written for the make.fun bounty "Two Days of Quiet Dread". The laugh has
// to come from the dread itself, in a flat tone, the way a tired engineer
// would really paste it before clicking approve.

import { mkdirSync, writeFileSync } from "node:fs";

// The line. "Approved." does the approving; the rest is the dread:
// reading a diff twice, finding nothing wrong, and knowing exactly
// what that means.
const COMMENT =
  "Approved. I read the whole diff twice and found nothing wrong, which is how I know something is wrong.";

const MAX_CHARS = 140;

function main(): void {
  const text = COMMENT.trim();

  // The gate, checked here before anything is written: 1 to 140
  // characters, one line, not only whitespace.
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  // It has to read as an approval, not just a joke: the line must carry
  // an explicit approval word up front.
  if (!/^(Approved|LGTM)\b/.test(text)) {
    throw new Error("entry must approve the pull request");
  }

  // No trailing newline: the file is the line, exactly as judged.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
}

main();
