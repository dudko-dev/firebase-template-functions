import { Request, Response } from 'express';
import { OnRequestFunIpToBan } from './OnRequestFunIpToBan';
import { logger } from '../../logger';

/**
 * On request function logger
 */
export class OnRequestFunLogger {
  /**
   *
   * @param req object of http Request
   * @param res object of http Response
   */
  constructor(req: Request, res: Response) {
    const ip = OnRequestFunIpToBan.getIp(req);
    this.response = res;
    this.logstr = `${OnRequestFunLogger.format(
      ip,
      15
    )} | ${OnRequestFunLogger.format(
      req.method,
      7
    )} | ${OnRequestFunLogger.format(req.originalUrl, 70)} | `;
    const self = this;
    this.response.on('error', (err: Error) => {
      self.logstr += `${OnRequestFunLogger.format(
        self.response.statusCode.toString(),
        3
      )} | `;
      if (self.info) self.logstr += ` | ${self.info}`;
      OnRequestFunLogger.log(self.logstr + err.message);
    });
    this.response.once('finish', () => {
      self.logstr += `${OnRequestFunLogger.format(
        self.response.statusCode.toString(),
        3
      )}`;
      if (self.info) self.logstr += ` | ${self.info}`;
      OnRequestFunLogger.log(self.logstr);
    });
  }

  /**
   * http Response
   */
  private response: Response;

  /**
   * additional Information
   */
  public info?: string;

  /**
   * string for log
   */
  private logstr: string;

  /**
   * log function
   */
  public static log = (d: string) => {
    setTimeout(
      (_d: string) => {
        logger.debug(_d);
      },
      1,
      d
    );
  };

  /**
   * function for formatting
   */
  public static format = (str: string, len: number) => {
    let strNew = str;
    if (strNew.length < len) {
      for (let i = strNew.length; i < len; i++) {
        strNew += ' ';
      }
    } else {
      strNew = strNew.substring(0, len);
    }
    return strNew;
  };
}
