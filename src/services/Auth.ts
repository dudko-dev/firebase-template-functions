/* eslint-disable */
import { app } from '../initialization';
import { getAuth } from 'firebase-admin/auth';
/* eslint-enable */

export const Auth = getAuth(app);
