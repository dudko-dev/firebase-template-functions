/**
 * This is an example of a basic function, it can be used to verify that the function is working and available.
 */
import { CallableRequest } from '../../../../services/FirebaseFunctionsV2';

/* eslint-disable-next-line */
export async function ping(
  /* eslint-disable-next-line */
  data: { [key: string]: any } | null,
  /* eslint-disable-next-line */
  callableRequest: CallableRequest
): Promise<{ pong: boolean }> {
  return {
    pong: true,
  };
}
