import { runWith } from '../../services/FirebaseFunctions';
import { handler } from './auth_user_sign_up';

// needs to upgrade to Firebase Auth with Identity Platform
// module.exports = runWith({
//   memory: '256MB',
//   timeoutSeconds: 60,
// })
//   .auth.user()
//   .beforeCreate(handler);

module.exports = runWith({
  memory: '256MB',
  timeoutSeconds: 60,
})
  .auth.user()
  .onCreate(handler);
