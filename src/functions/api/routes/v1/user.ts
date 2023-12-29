/**
 * This is an example of a basic route, it can be used to verify that the function is working and available.
 */
import { Router, Request, Response } from 'express';
import { onRequestFunResponseHandler } from '../../../../utils/onRequestFunResponseHandler';
import { onRequestFunErrorHandler } from '../../../../utils/onRequestFunErrorHandler';
import { userNormalizer } from '../../utils/userNormalizer';
import { UserModel } from '../../../../models/database/User';
import { Firestore } from '../../../../services/Firestore';

/**
 * User handling
 */
/* eslint-disable-next-line */
export const user = Router();

user.get('/v1/user', async (req: Request, res: Response) => {
  try {
    if (!(res.locals.user instanceof UserModel)) {
      await onRequestFunErrorHandler(res, new Error('Unauthorized'), 401);
      return;
    }
    const userModel = res.locals.user;
    await onRequestFunResponseHandler(res, userNormalizer(userModel));
  } catch (err) {
    await onRequestFunErrorHandler(res, err, 500);
  }
});

user.patch('/v1/user', async (req: Request, res: Response) => {
  try {
    if (!(res.locals.user instanceof UserModel)) {
      await onRequestFunErrorHandler(res, new Error('Unauthorized'), 401);
      return;
    }
    const userModel = res.locals.user;
    await Firestore.runTransaction(async (transaction) => {
      await userModel.load(transaction);
      if (typeof req.body.email === 'string') userModel.email = req.body.email;
      await userModel.save(transaction);
      return Promise.resolve(userModel);
    });
    await onRequestFunResponseHandler(res, userNormalizer(userModel));
  } catch (err: any) {
    if (err?.code) await onRequestFunErrorHandler(res, err, 400);
    else await onRequestFunErrorHandler(res, err, 500);
  }
});
