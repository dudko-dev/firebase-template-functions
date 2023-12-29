import { UserRecord } from '../../models/types/FirebaseAuthTypes';
import { logger } from '../../logger';
import { UserModel } from '../../models/database/User';

/**
 * Delete user in firestore
 *
 * @param userRecord - user record
 */
export async function deleteUser(userRecord: UserRecord) {
  try {
    const userSnap = await UserModel.withId(userRecord.uid);
    const user = userSnap.data();
    if (user) {
      await user.ref().delete();
    }
  } catch (err) {
    logger.debug(err);
    logger.error(`Error deleting user, id:${userRecord.uid}`);
    return false;
  }
  return true;
}

export async function handler(userRecord: UserRecord) {
  const res: boolean = await deleteUser(userRecord);
  if (res) logger.info(`Complete deleting user, id:${userRecord.uid}`);
}
