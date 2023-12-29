const { readFileSync, writeFileSync } = require('fs');
const { join: pathJoin } = require('path');
const { scryptSync, createCipheriv } = require('crypto');
const { EOL } = require('os');
const settings = require('./encryption-settings.json');

/**
 * Env files to encoding/decoding
 */
const envFileNames = settings.envFiles;
/**
 * Account files to encoding/decoding
 */
const accountFileNames = settings.accountFiles;
/**
 * Path to key file
 */
const passwordFilePath = pathJoin(__dirname, '../', '.envkey');
/**
 * password from env file
 */
const password = readFileSync(passwordFilePath)
  .toString('utf-8')
  .replace(/(^\s|\s$)/g, '');
/**
 * Salt for encryption/decryption
 */
const salt = settings.salt;
/**
 * Encryption/decryption vector
 */
const iv = Buffer.alloc(16, 0);
/**
 * Encryption/Decryption algorithm
 */
const algorithm = settings.algorithm;

// encrypting env files
for (const fileName of envFileNames) {
  const encryptedFilePath = pathJoin(__dirname, '../', `${fileName}.enc`);
  const decryptedFilePath = pathJoin(__dirname, '../', `${fileName}`);
  // encryption/decryption key
  const key = scryptSync(password, salt, 24);
  // decryptedFile
  const input = readFileSync(decryptedFilePath).toString('utf-8');
  const data = input
    .replace(/(^\s|\s$)/g, '')
    .replace(/\r\n/g, '\n')
    .split(/\n/g)
    .map((line) => {
      const key = line.split('=')[0];
      return {
        key,
        val: line.replace(new RegExp(`^${key}=?`), ''),
      };
    })
    .reduce((p, line) => {
      // encrypter
      const encipher = createCipheriv(algorithm, key, iv);
      const buf = Buffer.concat([
        encipher.update(line.val, 'utf-8'),
        encipher.final(),
      ]);
      return `${p}${line.key}=${buf.toString('base64')}${EOL}`;
    }, '');
  // encryptedFile
  writeFileSync(encryptedFilePath, data);
}

// encrypting account files
for (const fileName of accountFileNames) {
  const encryptedFilePath = pathJoin(__dirname, '../', `${fileName}.enc`);
  const decryptedFilePath = pathJoin(__dirname, '../', `${fileName}`);
  // encryption/decryption key
  const key = scryptSync(password, salt, 24);
  // decryptedFile
  const input = readFileSync(decryptedFilePath).toString('utf-8');
  const dataObj = JSON.parse(input);
  Object.keys(dataObj).forEach((k) => {
    // encrypter
    const encipher = createCipheriv(algorithm, key, iv);
    const buf = Buffer.concat([
      encipher.update(dataObj[k], 'utf-8'),
      encipher.final(),
    ]);
    dataObj[k] = buf.toString('base64');
  });
  const data = JSON.stringify(dataObj, null, '\t');
  // encryptedFile
  writeFileSync(encryptedFilePath, data);
}
