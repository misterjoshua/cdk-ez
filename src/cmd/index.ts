import { Sade } from "sade";

export const registerNotImplementedCommand = (prog: Sade, command: string): void => {
  prog.command(command).action(() => { console.error(`${command} is not implemented yet`) });
}

export const registerBuildCommand = (prog: Sade): void => {
  prog
    .command("build")
    .describe("it runs build")
    .action(() => {
      console.log("Hello");
    });
};

export const registerCommands = (prog: Sade): void => {
  registerBuildCommand(prog);

  registerNotImplementedCommand(prog, 'test');
  registerNotImplementedCommand(prog, 'lint');
  registerNotImplementedCommand(prog, 'deploy');
};
