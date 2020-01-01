import { InputOptions, OutputOptions } from "rollup";
import typescript, { RollupTypescriptOptions } from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export async function getRollupTypescriptOptions(
  input: string
): Promise<RollupTypescriptOptions> {
  return { lib: ["es6"], target: "es6", tsconfig: "./tsconfig.json" };
}

export async function getRollupInputOptions(
  input: string
): Promise<InputOptions> {
  const typescriptOptions = await getRollupTypescriptOptions(input);

  return {
    input,
    plugins: [typescript(typescriptOptions), resolve(), commonjs()]
  };
}

export async function getRollupOutputOptions(
  input: string
): Promise<OutputOptions> {
  return {
    dir: "dist",
    entryFileNames: "[name]/index.js",
    format: "cjs"
  };
}
