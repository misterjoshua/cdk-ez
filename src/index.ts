import * as sade from 'sade';
import { registerCommands } from './cmd';
import pkg from '../package.json';

const prog = sade('cdk-ez');

prog.version(pkg.version);
registerCommands(prog);

prog.parse(process.argv);
