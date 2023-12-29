/**
 * The reason for the existence of this module is that eslint
 * does not know how to work with exports inside a package.json,
 * and firebase uses them to implement cjs and esm modules.
 */

/* eslint-disable */
import {
  AuthEventContext,
  AuthUserRecord,
} from 'firebase-functions/lib/common/providers/identity';
/* eslint-enable */

export { AuthUserRecord, AuthEventContext };
