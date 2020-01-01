#!/usr/bin/env node

import { run } from "./run";

run(process.argv).catch((e: Error) => {
  console.error(e);
  process.exit(0);
});
