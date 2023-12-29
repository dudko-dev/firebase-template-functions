import Ajv from 'ajv';
import * as FunctionsConfigScheme from './scheme.json';

const ajv = new Ajv();
export const FunctionsConfigValidator = ajv.compile(FunctionsConfigScheme);
