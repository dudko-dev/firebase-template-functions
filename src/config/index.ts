/* eslint-disable */
import {
  projectID,
  storageBucket,
  databaseURL,
  defineString,
} from 'firebase-functions/params';
/* eslint-enable */
import { FunctionsConfigValidator } from '../models/types/FunctionsConfig/validator';
import { FunctionsConfigInterface } from '../models/types/FunctionsConfig/interface';

// Initialization firebase
export const FunctionsConfig: Readonly<FunctionsConfigInterface> =
  Object.freeze({
    firebase: {
      databaseURL: databaseURL.value(),
      storageBucket: storageBucket.value(),
      projectId: projectID.value(),
    },
    web: {
      apikey: defineString('WEB_APIKEY').value(),
    },
    site: {
      name: defineString('SITE_NAME').value(),
      url: defineString('SITE_URL').value(),
    },
  });

if (!FunctionsConfigValidator(FunctionsConfig))
  throw new Error(
    `Invalid config settings: ${JSON.stringify(
      FunctionsConfigValidator.errors
    )}`
  );
