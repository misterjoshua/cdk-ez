import { sync as globSync } from 'glob';

export const getEntries = async (): Promise<string[]> => {
  return globSync('./lambda/**.ts');
};
