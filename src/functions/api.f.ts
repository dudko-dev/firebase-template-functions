import { onRequest } from '../services/FirebaseFunctionsV2';
import { handler } from './api/index';

module.exports = onRequest(
  {
    memory: '256MiB',
    timeoutSeconds: 10,
    maxInstances: 1,
    concurrency: 500,
  },
  handler
);
