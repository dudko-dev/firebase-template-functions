/* eslint-disable */
import { app } from '../initialization';
import { getStorage } from 'firebase-admin/storage';
/* eslint-enable */

export const Storage = getStorage(app);
