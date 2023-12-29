/**
 * Error of the on request function
 */
export class OnRequestFunError extends Error {
  /**
   *
   * @param message - error message
   * @param code - http status code
   */
  constructor(message: string, code: number = 500) {
    super(message);
    this.code = code;
  }

  /**
   * Http 1.0 status
   */
  code: number;
}
