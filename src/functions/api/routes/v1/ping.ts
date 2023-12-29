/**
 * This is an example of a basic route, it can be used to verify that the function is working and available.
 */
import { Router, Request, Response } from 'express';
import { onRequestFunResponseHandler } from '../../../../utils/onRequestFunResponseHandler';

/**
 * Ping handling
 */
/* eslint-disable-next-line */
export const ping = Router();

ping.all('*', async (req: Request, res: Response) => {
  await onRequestFunResponseHandler(res, {
    pong: true,
  });
});
