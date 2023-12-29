import Express, { Request, Response, Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json as jsonParser } from 'body-parser';
import '../../initialization';
import { FunctionsConfig } from '../../config';
import { OnRequestFunLogger } from '../../utils/classes/OnRequestFunLogger';
import routes from './routes';
import { error } from './routes/error';
import { onRequestFunErrorHandler } from '../../utils/onRequestFunErrorHandler';
import { Auth } from '../../services/Auth';
import { UserModel } from '../../models/database/User';

const checkAuth = Router().use(
  async (req: Request, res: Response, next: Function) => {
    const { token: altToken } = req.query;
    if (['/v1/ping'].indexOf(req.path) !== -1) {
      next();
      return;
    }
    try {
      let token: string | undefined;
      if (req.headers?.authorization) {
        token = req.headers.authorization
          .replace(/bearer/i, '')
          .replace(/\s/g, '');
      } else if (typeof altToken === 'string') {
        token = decodeURIComponent(altToken);
      }
      if (typeof token !== 'string') {
        await onRequestFunErrorHandler(res, new Error('Unauthorized'), 401);
        return;
      }
      try {
        const idToken = await Auth.verifyIdToken(token);
        const user = await UserModel.withId(idToken.uid)
        if (!idToken || !user.exists) {
          throw new Error('Token invalid')
        }
        res.locals.idToken = idToken
        res.locals.user = user.data()
      } catch {
        await onRequestFunErrorHandler(res, new Error('Token invalid'), 403);
        return;
      }
      next();
    } catch (err: any) {
      await onRequestFunErrorHandler(res, err, 500);
    }
  }
);

export const handler = Express();

handler.use(helmet());
handler.use((req: Request, res: Response, next: Function) => {
  res.setHeader('X-Powered-By', FunctionsConfig.site.name);
  next();
});
handler.use(cors({ origin: true }));
handler.post('*', jsonParser());
handler.patch('*', jsonParser());
handler.put('*', jsonParser());

handler.use((req: Request, res: Response, next: Function) => {
  res.locals.OnRequestFunLogger = new OnRequestFunLogger(req, res);
  next();
});

for (const route of Object.keys(routes.v1)) {
  handler.all(
    [`/v1/${route}/?*`],
    checkAuth,
    routes.v1[route as keyof typeof routes.v1]
  );
}

// synchronous error handling, including 404
handler.use(error);
