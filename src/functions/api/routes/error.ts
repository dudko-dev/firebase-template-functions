import { Router, Request, Response } from 'express';
import { onRequestFunErrorHandler } from '../../../utils/onRequestFunErrorHandler';

/**
 * Error handling 404
 *
 * Error handling (synchronous functions)
 */
/* eslint-disable-next-line */
export const error = Router();

// all requests for an invalid route will get here
error.all('*', async (req: Request, res: Response) => {
  await onRequestFunErrorHandler(res, new Error('Not Found'), 404);
});

// Synchronous Error Handling
error.use(async (err: any, req: Request, res: Response) => {
  await onRequestFunErrorHandler(res, err);
});
