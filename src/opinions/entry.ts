import { sync as globSync } from "glob";

export async function getEntries(): Promise<string[]> {
  return globSync("./lambda/**/*.ts");
}
