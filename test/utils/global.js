'use strict';

const admin = require('firebase-admin');
const http = require('http');
const https = require('https');
const url = require('url');
const crypto = require('crypto');

/**
 * Export to Global Area
 */
Object.assign(global, {
  snapHandler,
  chaiRequestPromisify,
  getOriginalUrlFromDurableUrl,
  randomIntStr,
  randomStr,
  createUserContext,
});

/**
 * Create function callable context for application use
 *
 * @param {String} userId - user id
 * @returns
 */
function createUserContext(userId) {
  return {
    auth: {
      uid: userId,
      token: {},
    },
  };
}

/**
 *
 * This function will return the first snapshot of the changes from the submitted link.
 *
 * @param {admin.firestore.DocumentReference} docRef - document reference
 */
async function snapHandler(docRef) {
  if (
    !(docRef instanceof admin.firestore.DocumentReference) &&
    !(docRef instanceof admin.firestore.Query) &&
    !(docRef instanceof admin.firestore.CollectionReference)
  )
    throw new TypeError('Invalid argument');
  return new Promise((res, rej) => {
    const unsubscribe = docRef.onSnapshot(
      (docSnap) => {
        unsubscribe();
        res(docSnap);
      },
      (err) => {
        unsubscribe();
        rej(err);
      }
    );
  });
}

/**
 *
 * Return Promise from request.end
 *
 * @param {Request} request - http request
 */
function chaiRequestPromisify(request) {
  return new Promise((res, rej) => {
    request.end((err, response) => {
      if (err) {
        rej(err);
        return;
      }
      res(response);
    });
  });
}

/**
 * Get original url from google deep link
 *
 * @param {String} deepUrl - durable (google deep link) url
 */
async function getOriginalUrlFromDurableUrl(deepUrl) {
  if (typeof deepUrl !== 'string') throw new Error('Invalid url.');
  const _deepUrl = new url.URL(deepUrl);
  const requestLibrary = _deepUrl.protocol === 'https:' ? https : http;
  const response = await new Promise((res) => {
    requestLibrary.get(
      `https://firebasehostingproxy.page.link/${crypto.randomInt(
        700000000000
      )}/${_deepUrl.host}${_deepUrl.pathname}?_imcp=1`,
      res
    );
  });
  if (
    Math.trunc(response.statusCode / 100) !== 3 ||
    typeof response.headers !== 'object' ||
    typeof response.headers['location'] !== 'string'
  )
    throw new Error(
      `Invalid response: ${response.statusCode} - ${JSON.stringify(
        response.headers
      )}`
    );
  return response.headers['location'];
}

/**
 * Random int string like /0-9/
 *
 * @param {Number} length - length of the string, default 6
 * @returns
 */
function randomIntStr(length = 6) {
  return new Array(length)
    .fill(null)
    .map(() => crypto.randomInt(10))
    .join('');
}

/**
 * Random byte string like /0-9a-zA-Z/
 *
 * @param {Number} length - length of the string, default 6
 * @returns
 */
function randomStr(length = 6) {
  const charset =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
  return new Array(length)
    .fill(null)
    .map(() => charset.charAt(crypto.randomInt(charset.length)))
    .join('');
}
