import {
  FunctionsErrorCode,
  HttpsError,
} from '../../services/FirebaseFunctionsV2';

type OnCallFunErrorCodes = '#000001' | '#000002' | '#000003' | '#000004';

/**
 * Error of the on call function
 */
export class OnCallFunError extends HttpsError {
  constructor(
    code: OnCallFunErrorCodes = '#000001',
    details: string = 'Details are missing'
  ) {
    super(
      typeof OnCallFunError.onCallFunErrors[code] !== 'object'
        ? OnCallFunError.onCallFunErrors['#000001'].type
        : OnCallFunError.onCallFunErrors[code].type,
      typeof OnCallFunError.onCallFunErrors[code] !== 'object'
        ? '#000001'
        : code
    );
    this.onCallFunErrorCode = code;
    this.onCallFunErrorDetails = details;
  }

  /**
   * Error code
   */
  public onCallFunErrorCode: OnCallFunErrorCodes;

  /**
   * Error details
   */
  public onCallFunErrorDetails: string;

  /**
   * Errors map
   */
  public static onCallFunErrors: {
    [key: string]: {
      message: string;
      type: FunctionsErrorCode;
    };
  } = {
      '#000001': {
        message: 'Unknown error',
        type: 'internal',
      },
      '#000002': {
        message: 'Invalid parameters for calling the RPC function',
        type: 'invalid-argument',
      },
      '#000003': {
        message: 'There is no implementation for this action',
        type: 'invalid-argument',
      },
      '#000004': {
        message: 'There are no rights to perform this action',
        type: 'permission-denied',
      },
    };
}
