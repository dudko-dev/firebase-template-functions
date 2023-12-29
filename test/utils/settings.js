'use strict';

const projectsForTesting = ['fir-template-40a59'];
const serviceAccountKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (typeof serviceAccountKeyPath !== 'string')
  throw new Error(
    'The environment variable $GOOGLE_APPLICATION_CREDENTIALS is set incorrectly (this should be the absolute path to the service account).'
  );
const serviceAccount = require(serviceAccountKeyPath);
if (projectsForTesting.indexOf(serviceAccount.project_id) === -1)
  throw new Error('The project does not support tests.');
module.exports = {
  serviceAccount,
  serviceAccountKeyPath,
};
