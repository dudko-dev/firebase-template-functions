/**
 * The reason for the existence of this module is that eslint
 * does not know how to work with exports inside a package.json,
 * and firebase uses them to implement cjs and esm modules.
 */

import {
  EventContext,
  Response,
  runWith,
  Request,
  https,
} from 'firebase-functions/v1';

export { EventContext, Request, https, Response, runWith };
