import { applyLocalConfig } from "../applyLocalConfig";

export async function getEslintPatterns(): Promise<string[]> {
  return await applyLocalConfig("eslintPatterns", [
    "./bin/**/*.ts",
    "./lambda/**/*.ts",
    "./lib/**/*.ts",
    "./test/**/*.ts"
  ]);
}
