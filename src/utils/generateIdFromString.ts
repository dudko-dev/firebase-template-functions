import { createHash } from 'crypto';

export const generateIdFromString = (str: string): string => {
  const hash = createHash('md5');
  hash.update(str);
  const md5Hash = hash.digest('hex');
  const uuid = `${md5Hash.substring(0, 8)}-${md5Hash.substring(
    8,
    12
  )}-${md5Hash.substring(12, 16)}-${md5Hash.substring(
    16,
    20
  )}-${md5Hash.substring(20)}`;
  return uuid;
};
