export class ConverterError extends Error {
  /**
   *
   * @param msg - main error message
   * @param code - error code, 500 - if we are reading invalid data in firestore,
   * 400 - if if we are writing invalid data to firestore
   * @param details - detailed error message
   */
  constructor(msg: string, code: 500 | 400, details: string) {
    super(msg);
    this.code = code;
    this.details = details;
  }

  /**
   * error code, 500 - if we are reading invalid data in firestore,
   * 400 - if if we are writing invalid data to firestore
   */
  code: 500 | 400;

  /**
   * detailed error message
   */
  details: string;
}
