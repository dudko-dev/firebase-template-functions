'use strict';
const {
  serviceAccount,
  serviceAccountKeyPath,
} = require('../utils/settings.js');
require('../utils/global.js');
require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const admin = require('firebase-admin');
const testFn = require('firebase-functions-test')(
  {
    databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com',
    storageBucket: serviceAccount.project_id + '.appspot.com',
    projectId: serviceAccount.project_id,
  },
  serviceAccountKeyPath
);

const myFunctions = require('../../lib/loader');

const app = testFn.wrap(myFunctions.app);

describe('Basic processing of app function', function () {
  this.timeout(60000);
  this.beforeAll(async () => {
    return;
  });
  this.afterAll(async () => {
    return;
  });
  it('ping - invalid action', async function () {
    let e;
    try {
      const msg = {
        action: '',
        data: {},
      };
      await app({ data: msg });
    } catch (err) {
      if (err) e = err;
    } finally {
      chai.expect(e).to.be.an('error');
      chai.expect(e.message).to.eql('#000003');
    }
    return;
  });
  it('ping - invalid arguments', async function () {
    let e;
    try {
      const msg = {
        action: '',
      };
      await app({ data: msg });
    } catch (err) {
      if (err) e = err;
    } finally {
      chai.expect(e).to.be.an('error');
      chai.expect(e.message).to.eql('#000002');
    }
    return;
  });
  it('ping - ping action', async function () {
    const msg = {
      action: 'v1_ping',
      data: {},
    };
    const response = await app({ data: msg });
    chai.expect(response).to.be.an('object');
    chai.expect(response).to.deep.include({
      pong: true,
    });
    return;
  });
});
