import { app } from '../initialization';
import { getFirestore } from 'firebase-admin/firestore';

export const Firestore = getFirestore(app);
Firestore.settings({ ignoreUndefinedProperties: true });
