import fetch, { Response } from 'node-fetch';

/**
 * Http request error
 */
export class HttpRequestError extends Error {
  constructor({
    /**
     * error message
     */
    msg,
    /**
     * http response code
     */
    code,
    /**
     * http response text
     */
    text,
  }: {
    msg: string;
    code?: number;
    text?: string;
  }) {
    super(msg);
    this.response = {};
    if (typeof code === 'number') this.response.code = code;
    if (typeof text === 'string') {
      this.response.text = text;
    }
  }

  /**
   * Response data
   */
  public response?: {
    /**
     * http response code
     */
    code?: number;
    /**
     * http response text
     */
    text?: string;
  };
}

/**
 * Request with N attempts.
 *
 * Basic usage example:
 *
 * ```ts
 *  httpRequest({"url": "https://localhost"})
 * ```
 *
 * @internal
 * @param data
 * @param data.url - request url
 * @param data.method - request method, default: GET
 * @param data.data - request data
 * @param data.headers - request headers
 * @param data.attempts - request attempts, default: 10
 */
export async function httpRequest<T>({
  url,
  method = 'GET',
  data = {},
  headers = {},
  attempts = 10,
}: {
  url: string;
  method?: 'GET' | 'POST';
  data?: { [key: string]: any };
  headers?: { [key: string]: string };
  attempts?: number;
}): Promise<T> {
  try {
    const res: Response = await fetch(url, {
      method,
      ...(typeof data === 'object' && method === 'POST'
        ? { body: JSON.stringify(data) }
        : {}),
      headers: headers,
    });
    if (res.status !== 200) {
      const errData = await res.text().catch(() => res.statusText);
      throw new HttpRequestError({
        msg: `Response from (${method}:${url}) status:${res.status} data:${errData}.`,
        code: res.status,
        text: errData,
      });
    }
    const json = (await res.json()) as T;
    return json;
  } catch (err: any) {
    if (attempts > 1)
      return httpRequest<T>({
        url,
        method,
        data,
        headers,
        attempts: attempts - 1,
      });
    else return Promise.reject(err as Error | HttpRequestError);
  }
}
