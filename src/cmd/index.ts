import { Sade } from 'sade';
import { buildCommand } from './build';
import { watchCommand } from './watch';
import { lintCommand } from './lint';

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

  prog
    .command('lint')
    .option('--fix', 'Tells lint to fix files')
    .describe('it picks lint')
    .action(lintCommand);

  registerNotImplementedCommand(prog, 'test');
};
