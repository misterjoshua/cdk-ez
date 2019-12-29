import { Sade } from "sade";

export const registerBuildCommand = (prog: Sade) => {
  prog
    .command("build")
    .describe("it runs build")
    .action(opts => {
      console.log("Hello");
    });
};

export const registerCommands = (prog: Sade) => {
  registerBuildCommand(prog);
};
