import * as sade from 'sade';
import { registerCommands } from './cmd';

const pkg = require('../package.json');
const prog = sade('cdk-ez');

prog.version(pkg.version);
registerCommands(prog);

prog.parse(process.argv);