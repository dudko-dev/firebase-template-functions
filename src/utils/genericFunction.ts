export interface GenericFunctionWithOneArg<ArgType, ReturnType> {
  // eslint-disable-next-line no-unused-vars
  (arg: ArgType): ReturnType;
}

export interface GenericFunctionWithTwoArgs<ArgType0, ArgType1, ReturnType> {
  // eslint-disable-next-line no-unused-vars
  (arg0: ArgType0, arg1: ArgType1): ReturnType;
}

export interface GenericFunctionWithThreeArgs<
  ArgType0,
  ArgType1,
  ArgType2,
  ReturnType,
> {
  // eslint-disable-next-line no-unused-vars
  (arg0: ArgType0, arg1: ArgType1, arg2: ArgType2): ReturnType;
}

export interface UniversalGenericFunction {
  // eslint-disable-next-line no-unused-vars
  (...args: any[]): any;
}
