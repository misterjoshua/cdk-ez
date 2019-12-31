import { Sade } from 'sade';
import { buildCommand } from './build';
import { watchCommand } from './watch';
import { lintCommand } from './lint';
import { lintFixCommand } from './lintFix';
import { lintExecCommand } from './lintExec';

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

  prog.command('lint:execute').action(lintExecCommand);
  prog.command('lint:fix').action(lintFixCommand);

  registerNotImplementedCommand(prog, 'test');
  registerNotImplementedCommand(prog, 'init');

  // TODO: Support fractal project pattern.
  // TODO: Support .cdk-ez.config.ts
  // TODO: cdk-ez init (template directory)
  // TODO: Better local development experience
  // TODO: Eli wants "this isn't going to work" checks for user-specified customizations.
};
