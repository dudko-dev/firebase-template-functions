import {
  CallableRequest,
  Request,
  Response,
} from '../../services/FirebaseFunctionsV2';
import { logger } from '../../logger';

/**
 * On call function logger
 */
export class OnCallFunLogger {
  /**
   *
   * @param context - context of the function call.
   * @returns
   */
  constructor(callableRequest?: CallableRequest) {
    try {
      if (
        !callableRequest ||
        !callableRequest?.rawRequest ||
        callableRequest?.auth?.token?.isInternal === true
      )
        return;
      this.request = callableRequest.rawRequest;
      if (!callableRequest?.rawRequest?.res) return;
      this.response = callableRequest.rawRequest.res;

      this.userData = JSON.stringify({
        auth: callableRequest.auth,
      });
      this.requestData =
        this.request.rawBody instanceof Buffer
          ? this.request.rawBody.toString()
          : '';
      const self = this;
      (this.response as any).replaceableJson = this.response.json;
      this.response.json = (body) => {
        self.responseData =
          typeof body === 'object' ? JSON.stringify(body) : '';
        return (self.response as any).replaceableJson(body);
      };
      this.response.on('error', (err) => {
        logger.debug(
          `{ "Request": ${self.requestData}, "Error": "${err.message}", "User": ${self.userData} }`
        );
      });
      this.response.on('finish', () => {
        logger.debug(
          `{ "Request": ${self.requestData}, "Response": ${self.responseData}, "User": ${self.userData} }`
        );
      });
    } catch (err: any) {
      logger.error(`FirebaseFunctionsDebugger Error: ${err?.message}`);
    }
  }

  /**
   * Data of the user who called the function
   */
  private userData?: string;

  /**
   * Data that the function was called with
   */
  private requestData?: string;

  /**
   * Data that the function sent in response to the call
   */
  private responseData?: string;

  /**
   * Stream of Request to the function
   */
  private request?: Request;

  /**
   * Stream of Response from the function
   */
  private response?: Response;
}
