import { logger } from '../logger';
import { HttpsError } from '../services/FirebaseFunctionsV2';
import { OnCallFunError } from './classes/OnCallFunError';

/**
 * On call function error's handler
 *
 * @param err - error object
 */
export const onCallFunErrorHandler = async (
  err: OnCallFunError | HttpsError | Error
) => {
  if (err instanceof OnCallFunError) {
    logger.error('An on-call function error occurred');
    logger.error(err);
    throw err;
  } else {
    logger.error('An unknown function error occurred');
    logger.error(err);
    throw err instanceof HttpsError
      ? err
      : new HttpsError('internal', err?.message);
  }
};
