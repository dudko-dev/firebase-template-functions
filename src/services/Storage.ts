import { app } from '../initialization';
import { getStorage } from 'firebase-admin/storage';

export const Storage = getStorage(app);
