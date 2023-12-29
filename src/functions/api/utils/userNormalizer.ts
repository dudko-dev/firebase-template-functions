import { UserModel } from '../../../models/database/User';

export const userNormalizer = (user: UserModel) => ({
  id: user.id,
  email: user.email,
});
