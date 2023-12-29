import { runWith } from '../../services/FirebaseFunctions';
import { handler } from './auth_user_delete';

module.exports = runWith({
  memory: '256MB',
  timeoutSeconds: 60,
})
  .auth.user()
  .onDelete(handler);
