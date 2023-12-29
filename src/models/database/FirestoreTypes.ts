/**
 * The reason for the existence of this module is that eslint
 * does not know how to work with exports inside a package.json,
 * and firebase uses them to implement cjs and esm modules.
 */

/* eslint-disable */
import {
  DocumentReference,
  DocumentSnapshot,
  CollectionReference,
  Transaction,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WriteResult,
  Timestamp,
  GeoPoint,
  FieldValue,
  QuerySnapshot,
  Query,
} from 'firebase-admin/firestore';
/* eslint-enable */

export {
  DocumentReference,
  DocumentSnapshot,
  CollectionReference,
  Transaction,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WriteResult,
  Timestamp,
  GeoPoint,
  FieldValue,
  QuerySnapshot,
  Query,
};
