import { readdirSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const dirTextPath = pathJoin(__dirname, '../../templates/text');

const textTemplateFiles = readdirSync(dirTextPath)
  .filter((e) => typeof e === 'string' && /\.txt$/i.test(e))
  .reduce((accumulator, currentValue) => {
    accumulator[currentValue.replace(/\.txt$/i, '')] = readFileSync(
      pathJoin(dirTextPath, currentValue)
    );
    return accumulator;
  }, {} as { [key: string]: Buffer });

type TextEditor = (
  options: { [key: string]: any },
  replaceTemplate?: string
) => { text: string };
const textEditors = Object.keys(textTemplateFiles).reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue] = (
      options: { [key: string]: any } = {},
      replaceTemplate?: string
    ) => {
      const text = Object.keys(options).reduce(
        (a, cv) =>
          a.replace(new RegExp(`{{\\s*${cv}\\s*}}`, 'g'), `${options[cv]}`),
        typeof replaceTemplate === 'string'
          ? replaceTemplate
          : textTemplateFiles[currentValue].toString('utf8')
      );
      return { text };
    };
    return accumulator;
  },
  {} as { [key: string]: TextEditor }
);

/**
 * Text/SMS templates
 */
export const textMsgTemplates = textEditors as {
  /**
   * Example of the text message template
   */
  example: TextEditor;
};
