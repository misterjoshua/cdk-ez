#!/usr/bin/env node

import sade from 'sade';
import { registerCommands } from './cmd';
import pkg from '../package.json';

const prog = sade('cdk-ez');

prog.version(pkg.version);
registerCommands(prog);

console.log('IT GOES');
prog.parse(process.argv);
