import { InputOptions, OutputOptions } from "rollup";
import rpTypescript from "@wessberg/rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export async function getRollupInputOptions(
  input: string
): Promise<InputOptions> {
  return {
    input,
    plugins: [
      //
      rpTypescript(),
      resolve(),
      commonjs()
    ]
  };
}

export function mapInputPathToDist(iput: string): string {
  return iput.replace(/^\.\/(.*)\.[tj]s/, "$1/index.js");
}

export async function getRollupOutputOptions(
  input: string
): Promise<OutputOptions> {
  return {
    dir: "dist",
    entryFileNames: mapInputPathToDist(input),
    format: "cjs"
  };
}
