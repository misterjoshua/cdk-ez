import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { preserveShebangs } from "rollup-plugin-preserve-shebangs";

import tsconfig from "./tsconfig.json";

export default {
  input: "./src/index.ts",
  output: {
    dir: "dist",
    entryFileNames: "index.js",
    format: "cjs"
  },
  external: [
    "@rollup/plugin-commonjs",
    "@rollup/plugin-node-resolve",
    "@rollup/plugin-typescript",
    "chokidar",
    "eslint",
    "execa",
    "fs-extra",
    "fs",
    "glob",
    "jest",
    "listr",
    "path",
    "rollup",
    "sade",
    "util"
  ],
  plugins: [typescript(tsconfig.compilerOptions), json(), preserveShebangs()]
};
