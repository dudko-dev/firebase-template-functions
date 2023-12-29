/* eslint-disable */
import { app } from '../initialization';
import { getFirestore } from 'firebase-admin/firestore';
/* eslint-enable */

export const Firestore = getFirestore(app);
