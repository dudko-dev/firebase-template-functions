/**
 * The reason for the existence of this module is that eslint
 * does not know how to work with exports inside a package.json,
 * and firebase uses them to implement cjs and esm modules.
 */

import {
  CallableRequest,
  Request,
  FunctionsErrorCode,
  HttpsError,
  onRequest,
  onCall,
} from 'firebase-functions/v2/https';
import { Response } from 'express';
import {
  AppCheckData,
  AuthData,
} from 'firebase-functions/lib/common/providers/https';

export {
  AppCheckData,
  AuthData,
  CallableRequest,
  Request,
  FunctionsErrorCode,
  HttpsError,
  Response,
  onRequest,
  onCall,
};
