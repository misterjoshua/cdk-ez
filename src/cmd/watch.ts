import * as chokidar from 'chokidar';
import { buildCommand } from './build';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chokidarWatch = (chokidar as any).watch;

let building = false;
const onChange = async (): Promise<void> => {
  if (!building) {
    building = true;
    try {
      await buildCommand();
    } finally {
      building = false;
    }
  }
};

export const watchCommand = async (): Promise<void> => {
  const watcher = chokidarWatch(['lib', 'lambda']);
  watcher.on('all', onChange);
};
