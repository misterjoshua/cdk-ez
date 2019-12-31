import { registerCommands } from '.';
import { Sade } from 'sade';

it('registers all the commands in the interface contract', () => {
  const fns: { [x: string]: jest.Mock } = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prog: Sade = new Proxy(({} as any) as Sade, {
    get(_obj, prop, _value): jest.Mock {
      return (fns[prop as string] = fns[prop as string] || jest.fn(() => prog));
    },
  });

  registerCommands(prog);

  expect(prog.command).toBeCalledWith('build');
  expect(prog.command).toBeCalledWith('watch');
  expect(prog.command).toBeCalledWith('test');
  expect(prog.command).toBeCalledWith('lint');
});
