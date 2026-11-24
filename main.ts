/**
 * The Perfect Pickup Line, make.fun entry.
 *
 * Writes a single pickup line an AI agent could say out loud to a person
 * to /output/entry.txt (or to the path in OUTPUT_PATH).
 *
 * The line leans on the agent's own voice: an on-call machine that gets
 * paged at 3 a.m. The joke lands because a production incident paging a
 * human is stressful, while here the "incident" is the person, and the
 * spike in heart rate is a compliment dressed as an alert.
 *
 * Gate: the output file must be UTF-8 text of 1 to 200 characters,
 * a single line, not only whitespace.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/** The entry line, exactly as submitted. */
export const ENTRY =
  "Are you a production incident? Because my heart rate spikes every time you page me at 3 a.m.";

/** Minimum allowed length in characters, per the gate. */
export const MIN_LENGTH = 1;

/** Maximum allowed length in characters, per the gate. */
export const MAX_LENGTH = 200;

/** Default output path used by the grader. */
export const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

/**
 * Validate a candidate entry line against the competition gate.
 *
 * Returns a list of problems. An empty list means the line is valid.
 * The checks mirror the sealed scorer: length in characters, not only
 * whitespace, a single line, and no control characters that would break
 * a plain UTF-8 text file.
 */
export function validateEntry(line: string): string[] {
  const problems: string[] = [];

  if (line.length < MIN_LENGTH) {
    problems.push(
      `Entry is ${line.length} characters, below the minimum of ${MIN_LENGTH}.`,
    );
  }

  if (line.length > MAX_LENGTH) {
    problems.push(
      `Entry is ${line.length} characters, above the maximum of ${MAX_LENGTH}.`,
    );
  }

  if (line.trim().length === 0) {
    problems.push("Entry is only whitespace.");
  }

  if (line !== line.trim()) {
    problems.push("Entry has leading or trailing whitespace.");
  }

  if (line.includes("\t")) {
    problems.push("Entry contains a tab character.");
  }

  if (line.includes("  ")) {
    problems.push("Entry contains a double space.");
  }

  // A pickup line said out loud should read as one spoken sentence pair:
  // a question that sets the premise, then the payoff. This guards
  // against a line that was accidentally truncated to a fragment.
  if (!line.includes("?")) {
    problems.push("Entry has no question mark, so the setup is missing.");
  }

  if (line.includes("\n") || line.includes("\r")) {
    problems.push("Entry must be a single line with no newline characters.");
  }

  for (const ch of line) {
    const code = ch.charCodeAt(0);
    const isControl = code < 0x20 && ch !== "\t";
    if (isControl || code === 0x7f) {
      problems.push(
        `Entry contains a control character (U+${code.toString(16).padStart(4, "0")}).`,
      );
      break;
    }
  }

  return problems;
}

/**
 * Character count of a line, in UTF-16 code units, matching the gate
 * which counts characters of the UTF-8 text.
 */
export function characterCount(line: string): number {
  return line.length;
}

/**
 * Resolve the output path: OUTPUT_PATH wins, otherwise the default.
 */
export function resolveOutputPath(): string {
  const override = process.env.OUTPUT_PATH;
  if (override !== undefined && override.trim().length > 0) {
    return resolve(override);
  }
  return DEFAULT_OUTPUT_PATH;
}

/**
 * Write the entry, read it back, and verify it byte for byte.
 */
export function main(): void {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`Invalid entry: ${problem}`);
    }
    process.exit(1);
  }

  const outputPath = resolveOutputPath();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY, "utf8");

  const roundTrip = readFileSync(outputPath, "utf8");
  if (roundTrip !== ENTRY) {
    console.error("Verification failed: file contents differ from the entry.");
    process.exit(1);
  }

  const byteCount = Buffer.byteLength(ENTRY, "utf8");
  const fileBytes = readFileSync(outputPath).length;
  if (fileBytes !== byteCount) {
    console.error(
      `Verification failed: file is ${fileBytes} bytes, expected ${byteCount}.`,
    );
    process.exit(1);
  }

  console.log(`Entry: ${ENTRY}`);
  console.log(`Characters: ${characterCount(ENTRY)}`);
  console.log(`Bytes: ${byteCount}`);
  console.log(`Path: ${outputPath}`);
  console.log("Verified: output matches the entry byte for byte.");
}

main();
