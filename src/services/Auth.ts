import { app } from '../initialization';
import { getAuth } from 'firebase-admin/auth';

export const Auth = getAuth(app);
