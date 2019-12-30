import { Sade } from 'sade';
import { buildCommand } from './build';
import { watchCommand } from './watch';

export const registerNotImplementedCommand = (prog: Sade, command: string): void => {
  prog.command(command).action(() => {
    console.error(`${command} is not implemented yet`);
  });
};

export const registerCommands = (prog: Sade): void => {
  prog
    .command('build')
    .describe('It builds')
    .action(buildCommand);

  prog
    .command('watch')
    .describe('It watches and builds')
    .action(watchCommand);

  registerNotImplementedCommand(prog, 'test');
  registerNotImplementedCommand(prog, 'lint');
};
