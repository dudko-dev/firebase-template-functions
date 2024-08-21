import { Auth } from '../services/Auth';
import { UserRecord, ListUsersResult } from '../models/types/FirebaseAuthTypes';

export const listAllAuthUsers = async (
  arr: UserRecord[] = [],
  nextPageToken?: string
): Promise<UserRecord[]> => {
  // List batch of users, 1000 at a time.
  return Auth.listUsers(1000, nextPageToken).then(
    (listUsersResult: ListUsersResult) => {
      const newArr = [...arr, ...listUsersResult.users];
      if (listUsersResult.pageToken) {
        // List next batch of users.
        return listAllAuthUsers(newArr, listUsersResult.pageToken);
      }
      return newArr;
    }
  );
};
