// import * as moment from 'moment-timezone';
// import { Firestore } from '../../models/database/Firestore';
// import {
//   FieldValue,
//   DocumentReference,
// } from '../../models/database/FirestoreTypes';
// import { logger } from '../../logger';

/**
 * IP to ban system for on request function
 */
export class OnRequestFunIpToBan {
  // /**
  //  *
  //  * @param req - req object
  //  * @param blockTime - time to blocking
  //  */
  // constructor(req: any, blockTime: number = 86400000) {
  //   const ip: string = OnRequestFunIpToBan.getIp(req);
  //   if (typeof ip !== 'string' || typeof blockTime !== 'number')
  //     throw new Error('Failed to initialize ip to ban');
  //   this.ip = ip;
  //   if (this.ip !== '')
  //     this.ref = Firestore.collection('blocked').doc(
  //       this.ip.replace(/\//g, '').replace(/\./g, '_').replace(/:/g, '_')
  //     );
  //   else
  //     logger.error(
  //       'Protection against brute force attacks does not work, probably the firebase has changed the headers.'
  //     );
  //   this.blockTime = blockTime;
  // }

  // maxAttemps: number = 5;

  // ip: string;

  // ref?: DocumentReference;

  // blockTime: number;

  static getIp(req: any) {
    let ip: string = '';
    if (typeof req !== 'object' || typeof req.headers !== 'object') return ip;
    if (
      typeof req.headers.via === 'string' &&
      typeof req.headers['fastly-temp-xff'] === 'string' &&
      req.headers.via.match(/hosting/gi)
    ) {
      req.headers['fastly-temp-xff']
        .replace(/\s/g, '')
        .split(',')
        .forEach((d) => {
          if (d.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) ip = d;
        });
    } else if (typeof req.headers['x-appengine-user-ip'] === 'string') {
      ip = req.headers['x-appengine-user-ip'];
    }
    ip = ip.match(/^::ffff:.*/i) ? ip.replace(/^::ffff:/i, '') : ip;
    return ip;
  }

  // /**
  //  * Is the address blocked
  //  */
  // async isBlocked() {
  //   if (!this.ref) return false;
  //   const { ref } = this;
  //   const result = await Firestore.runTransaction(async (transaction) => {
  //     const blockedSnap = await transaction.get(ref);
  //     if (!blockedSnap.exists) return false;
  //     const blockedData = blockedSnap.data();
  //     if (!blockedData) return false;
  //     if (
  //       blockedData.lastAttemptedAt.toMillis() + this.blockTime >
  //         moment.now() &&
  //       blockedData.attempts >= this.maxAttemps
  //     )
  //       return true;
  //     return false;
  //   });
  //   return result;
  // }

  // /**
  //  * Login successful
  //  */
  // async isOk() {
  //   if (!this.ref) return true;
  //   const { ref } = this;
  //   const result = await Firestore.runTransaction(async (transaction) => {
  //     const blockedSnap = await transaction.get(ref);
  //     if (!blockedSnap.exists) return true;
  //     transaction.delete(ref);
  //     return Promise.resolve(true);
  //   });
  //   return result;
  // }

  // /**
  //  * Login failed
  //  */
  // async isFail() {
  //   if (!this.ref) return true;
  //   const { ref } = this;
  //   const result = await Firestore.runTransaction(async (transaction) => {
  //     const blockedSnap = await transaction.get(ref);
  //     const blocked: { [key: string]: any } = {
  //       lastAttemptedAt: FieldValue.serverTimestamp(),
  //     };
  //     if (blockedSnap.exists) {
  //       const blockedData = blockedSnap.data();
  //       if (
  //         blockedData &&
  //         blockedData.lastAttemptedAt.toMillis() + this.blockTime < moment.now()
  //       )
  //         blocked.attempts = 1;
  //       else blocked.attempts = FieldValue.increment(1);
  //       transaction.update(ref, blocked);
  //     } else {
  //       blocked.ip = this.ip;
  //       blocked.createdAt = FieldValue.serverTimestamp();
  //       blocked.attempts = 1;
  //       transaction.set(ref, blocked);
  //     }
  //     return Promise.resolve(true);
  //   });
  //   return result;
  // }
}
