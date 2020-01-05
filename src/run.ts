import sade from "sade";
import { registerCommands } from "./cmd";
import { installLocalConfig } from "./config/installLocalConfigFiles";
import { getVersion } from "./getVersion";

export async function run(argv: string[]): Promise<void> {
  const prog = sade("cdk-ez");

  // Configure sade cli commands
  prog.version(getVersion());
  registerCommands(prog);

  // Install local configuration files.
  await installLocalConfig();

  // Execute cli commands
  prog.parse(argv);
}
