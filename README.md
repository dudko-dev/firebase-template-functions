# Firebase Template

This is part of the [firebase-template project](!https://github.com/search?q=topic%3Afirebase-template+org%3Adudko-dev&type=Repositories), which consists of:

- `firebase` - firebase settings, including hosting settings and basic access rights, repo: [dudko-dev/firebase-template](https://github.com/dudko-dev/firebase-template)
- `firebase/functions` - gRPC and http cloud functions, repo: [dudko-dev/firebase-template-functions](https://github.com/dudko-dev/firebase-template-functions)
- `firebase/hosting/api` - a web portal based on react, repo: [dudko-dev/firebase-template-website](https://github.com/dudko-dev/firebase-template-website)
- `firebase/hosting/website` - web portal on js, repo: [dudko-dev/firebase-template-api](https://github.com/dudko-dev/firebase-template-api)

The project allows you to quickly deploy the basic configuration of firebase, configure the basic skeleton of cloud functions, deploy a portal on react with ready-made authorization/registration/email confirmation/password recovery methods.

just run a script:

```bash
#!/usr/bin/bash
FIREBASE_REPO="dudko-dev/firebase-template"
FIREBASE_REPO_DIR="."
FIREBASE_FUNCTIONS_REPO="dudko-dev/firebase-template-functions"
FIREBASE_FUNCTIONS_DIR="./functions"
FIREBASE_WEBSITE_REPO="dudko-dev/firebase-template-website"
FIREBASE_WEBSITE_DIR="./hosting/website"
FIREBASE_WEBAPI_REPO="dudko-dev/firebase-template-api"
FIREBASE_WEBAPI_DIR="./hosting/api"

mkdir $FIREBASE_REPO_DIR
git clone $FIREBASE_REPO $FIREBASE_REPO_DIR
mkdir $FIREBASE_FUNCTIONS_DIR
git clone $FIREBASE_FUNCTIONS_REPO $FIREBASE_FUNCTIONS_DIR
mkdir $FIREBASE_WEBSITE_DIR
git clone $FIREBASE_WEBSITE_REPO $FIREBASE_WEBSITE_DIR
mkdir $FIREBASE_WEBAPI_DIR
git clone $FIREBASE_WEBAPI_REPO $FIREBASE_WEBAPI_DIR
```

## Firebase functions

Cloud functions for the project. All functions are requested via `lib/loader.js` using dynamic loading.

## Preparation

- Install the dependencies: `npm ci`
- Install global dependencies: `sudo npm install firebase-tools -g`
- Set the .envkey file: `echo "00000000-0000-0000-0000-000000000000">./.envkey`
- Decrypt env and accoun files: `npm run decrypt`
- To update the dependencies: `npm run update`
- To run lint `npm run lint`
- To run build `npm run build`

## For tests

- Export environment `export GOOGLE_APPLICATION_CREDENTIALS=/${PATH_TO_DIRECTORY}/accounts/development.json`. For security reasons, tests do not work (uncomment in the file: `functions/test/utils/settings.js`. currently, the tests work in the prod) with production.
- To run tests in the emulator `npm run test`.
- To run tests with coverage verification in the emulator `npm run cov`.
- To run test api only in the emulator `npm run test:api`
- To run test triggers only in the emulator `npm run test:triggers`

## For deploy

- To run deploy `npm run deploy`.

## Other

- To create docs `npm run doc`.
- To run standard shell `npm run shell`.
- To run backup `npm run backup`.
- To run emulators `npm run start`.
