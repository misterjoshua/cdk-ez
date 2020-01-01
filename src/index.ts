#!/usr/bin/env node

import sade from "sade";
import { registerCommands } from "./cmd";
import pkg from "../package.json";
import { installLocalConfig } from "./config/installLocalConfig";

async function main(): Promise<void> {
  const prog = sade("cdk-ez");

  // Configure sade cli commands
  prog.version(pkg.version);
  registerCommands(prog);

  // Install local configuration files.
  await installLocalConfig();

  // Execute cli commands
  prog.parse(process.argv);
}

main().catch((e: Error) => {
  console.error(e);
  process.exit(0);
});
