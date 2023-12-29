import { Response } from 'express';
import { logger } from '../logger';
import { onRequestFunErrorHandler } from './onRequestFunErrorHandler';

/**
 * On request functions response handler
 *
 * @param res - response object
 * @param payload - payload object
 */
export const onRequestFunResponseHandler = async (
  res: Response,
  payload: { [key: string]: any } | any[],
  status: number = 200
) => {
  logger.debug(payload);
  try {
    res.status(status).json(payload);
    return undefined;
  } catch (err) {
    await onRequestFunErrorHandler(res, err);
  }
  return undefined;
};
