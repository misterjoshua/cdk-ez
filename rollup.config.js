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
    "@rollup/plugin-json",
    "@rollup/plugin-node-resolve",
    "@wessberg/rollup-plugin-ts",
    "chalk",
    "chokidar",
    "eslint",
    "execa",
    "figures",
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
