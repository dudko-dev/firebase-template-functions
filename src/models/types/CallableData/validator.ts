import Ajv from 'ajv';
import * as CallableDataScheme from './scheme.json';

const ajv = new Ajv();
export const CallableDataValidator = ajv.compile(CallableDataScheme);
