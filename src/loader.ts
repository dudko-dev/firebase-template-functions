/**
 * This is a function loader.
 * This code is not executed in runtime, but only during assembly.
 */

import { readdirSync } from 'fs';
import { join } from 'path';

const functionsPostfix = '.f.js';
const functionsPath = join(__dirname, 'functions');
const functionsFileRegex = new RegExp(
  `^.*${functionsPostfix.replace('.', '\\.')}$`,
  'gi'
);
const functionsDirs = readdirSync(functionsPath, {
  withFileTypes: true,
  recursive: true,
}).filter((dir) => dir.isFile() && functionsFileRegex.test(dir.name));
for (const functionDir of functionsDirs) {
  const functionPath = join(functionDir.parentPath, functionDir.name);
  const functionName = functionPath
    .replace(functionsPath, '')
    .replace(new RegExp(`${functionsPostfix.replace('.', '\\.')}$`), '')
    .replace(new RegExp('^/'), '')
    .replaceAll('/', '_');
  if (
    !process.env.FUNCTION_NAME ||
    process.env.FUNCTION_NAME === functionName
  ) {
    /* eslint-disable-next-line */
    exports[functionName] = require(functionPath);
  }
}
