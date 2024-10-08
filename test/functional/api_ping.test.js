'use strict';
const {
  serviceAccount,
  serviceAccountKeyPath,
} = require('../utils/settings.js');
require('../utils/global.js');
require('mocha');
const sinon = require('sinon');
const chaiLoader = import('chai');
const chaiHttpLoader = import('chai-http');
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

const api = myFunctions.api;

describe('Basic processing of api function', function () {
  let chai;
  this.timeout(60000);
  this.beforeAll(async () => {
    const [chaiModule, chaiHttpModule] = await Promise.all([
      chaiLoader,
      chaiHttpLoader,
    ]);
    chai = chaiModule.use(chaiHttpModule.default);
  });
  this.afterAll(async () => {
    return;
  });
  it('ping - invalid route', async function () {
    const request = chai.request.execute(api).get('/404');
    const res = await chaiRequestPromisify(request);
    chai.expect(res.status).to.eql(404);
    return;
  });
  it('ping - ping route', async function () {
    const request = chai.request.execute(api).post('/v1/ping');
    request.set('Content-Type', 'application/json');
    request.send({});
    const res = await chaiRequestPromisify(request);
    chai.expect(res.status).to.eql(200);
    chai.expect(res.type).to.eql('application/json');
    chai.expect(res.charset).to.eql('utf-8');
    chai.expect(res.body).to.be.an('object');
    chai.expect(res.body).to.eql({ pong: true });
    return;
  });
});
