import { Sade } from 'sade';
import { build } from './build';

export const registerNotImplementedCommand = (prog: Sade, command: string): void => {
  prog.command(command).action(() => {
    console.error(`${command} is not implemented yet`);
  });
};

export const registerBuildCommand = (prog: Sade): void => {
  prog
    .command('build')
    .describe('It builds')
    .action(() => {
      build();
    });
};

export const registerCommands = (prog: Sade): void => {
  registerBuildCommand(prog);

  registerNotImplementedCommand(prog, 'test');
  registerNotImplementedCommand(prog, 'lint');
};
