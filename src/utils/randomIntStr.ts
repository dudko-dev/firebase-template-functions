import { randomInt } from 'crypto';

/**
 * Generate random N-digital string
 *
 * @internal
 * @return - N-digital string
 */
export const randomIntStr = (length: number) =>
  new Array(length)
    .fill(null)
    .map(() => randomInt(10))
    .join('');
