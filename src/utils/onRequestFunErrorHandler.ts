import { Response } from 'express';
import { OnRequestFunError } from './classes/OnRequestFunError';
import { OnRequestFunLogger } from './classes/OnRequestFunLogger';

/**
 * On request function error's handler
 *
 * @param res - response object
 * @param err - error object
 * @param status - status code
 */
export const onRequestFunErrorHandler = async (
  res: Response,
  err: any,
  status: number = 500
) => {
  try {
    const msg = {
      message: err && err.message ? err.message : 'Unknown error',
    };
    const logger: OnRequestFunLogger = res.locals.OnRequestFunLogger;
    if (!logger.info) logger.info = '';
    logger.info += msg.message;
    if (err instanceof OnRequestFunError) res.status(err.code).json(msg);
    else res.status(status).json(msg);
  } catch (_err) {
    res.end();
  }
};
