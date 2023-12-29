import { AuthUserRecord } from '../../models/types/IdentityPlatformTypes';
import { logger } from '../../logger';
import { UserModel } from '../../models/database/User';
import { Firestore } from '../../services/Firestore';

/**
 * Create or update user in firestore
 *
 * @param userRecord - user record
 */
export async function createOrUpdateUser(userRecord: AuthUserRecord) {
  try {
    let user = new UserModel({
      id: userRecord.uid,
      email: typeof userRecord.email === 'string' ? userRecord.email : '',
    });
    await Firestore.runTransaction(async (transaction) => {
      const userSnap = await transaction.get(user.ref());
      if (userSnap.exists) {
        user = userSnap.data() as UserModel;
        user.email =
          typeof userRecord.email === 'string' ? userRecord.email : '';
      }
      transaction.set(user.ref(), user);
    });
  } catch (err) {
    logger.debug(err);
    logger.error(`Error updating user, id:${userRecord.uid}`);
    return false;
  }
  return true;
}

export async function handler(userRecord: AuthUserRecord) {
  const res: boolean = await createOrUpdateUser(userRecord);
  if (res) logger.info(`Complete updating user, id:${userRecord.uid}`);
  else throw new Error('An unknown error has occurred.');
}
