import { runWith } from '../../services/FirebaseFunctions';
import { handler } from './auth_user_sign_up';

module.exports = runWith({
  memory: '256MB',
  timeoutSeconds: 60,
})
  .auth.user()
  .beforeCreate(handler);
