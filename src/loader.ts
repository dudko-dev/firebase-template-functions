/**
 * This is a function loader.
 * This code is not executed in runtime, but only during assembly.
 */

import * as glob from 'glob';

const files = glob.sync('./functions/**/*.f.js', {
  cwd: __dirname,
  ignore: './node_modules/**',
});
for (let f = 0, fl = files.length; f < fl; f++) {
  const file = files[f];
  const functionName = file
    .replace('./functions/', '')
    .replace('.f.js', '')
    .split('/')
    .join('_');
  if (
    !process.env.FUNCTION_NAME ||
    process.env.FUNCTION_NAME === functionName
  ) {
    /* eslint-disable-next-line */
    exports[functionName] = require(file);
  }
}
