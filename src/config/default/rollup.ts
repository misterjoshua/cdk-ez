import { InputOptions, OutputOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import builtins from "builtin-modules";
import { applyLocalConfig } from "../applyLocalConfig";

export async function getRollupInputOptions(
  input: string
): Promise<InputOptions> {
  return await applyLocalConfig("rollupInputOptions", {
    input,
    external: builtins.map(i => i),
    plugins: [typescript(), commonjs(), json()]
  });
}

export function mapInputPathToDist(iput: string): string {
  return iput.replace(/^(\.\/)?(.*)\.[tj]s/, "$2/index.js");
}

export async function getRollupOutputOptions(
  input: string
): Promise<OutputOptions> {
  return await applyLocalConfig("rollupOutputOptions", {
    dir: "dist",
    entryFileNames: mapInputPathToDist(input),
    format: "cjs"
  });
}
