import { Sade } from "sade";

export const registerNotImplementedCommand = (prog: Sade, command: string) => {
  prog.command(command).action(() => { console.error(`${command} is not implemented yet`) });
}

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

  registerNotImplementedCommand(prog, 'test');
  registerNotImplementedCommand(prog, 'lint');
  registerNotImplementedCommand(prog, 'deploy');
};
