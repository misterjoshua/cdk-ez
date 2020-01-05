import { sync as globSync } from "glob";
import { applyLocalConfig } from "../applyLocalConfig";

export async function getEntriesGlob(): Promise<string> {
  return await applyLocalConfig("entriesGlob", "./lambda/**/*.ts");
}

export async function getEntries(): Promise<string[]> {
  return await applyLocalConfig("entries", globSync(await getEntriesGlob()));
}
