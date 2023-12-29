
import { onCall } from '../services/FirebaseFunctionsV2';
import { handler } from './app/index';

module.exports = onCall(
  {
    memory: '256MiB',
    timeoutSeconds: 10,
    maxInstances: 1,
    concurrency: 500,
  },
  handler
);
