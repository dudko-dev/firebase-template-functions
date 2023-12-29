import { CallableRequest } from '../services/FirebaseFunctionsV2';
import { OnCallFunError } from './classes/OnCallFunError';
import { UserModel } from '../models/database/User';

/**
 * Check rights of the application user
 *
 * @param param0
 * @param param0.context - callable context
 * @returns
 */
export const checkRightsOfUser = async ({
  callableRequest,
}: {
  callableRequest?: CallableRequest;
}): Promise<UserModel> => {
  const userSnap = await UserModel.withId(
    callableRequest?.auth?.uid || 'invalid-token'
  );
  if (!userSnap.exists)
    throw new OnCallFunError('#000004', 'The user does not exists');
  const user = userSnap.data();
  if (!user) throw new OnCallFunError('#000004', 'The user does not exists');
  return Promise.resolve(user);
};
