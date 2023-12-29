import { readdirSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { htmlToText } from 'html-to-text';

const dirHtmlPath = pathJoin(__dirname, '../../templates/html');

const htmlTemplateFiles = readdirSync(dirHtmlPath)
  .filter((e) => typeof e === 'string' && /\.html$/i.test(e))
  .reduce((accumulator, currentValue) => {
    accumulator[currentValue.replace(/\.html$/i, '')] = readFileSync(
      pathJoin(dirHtmlPath, currentValue)
    );
    return accumulator;
  }, {} as { [key: string]: Buffer });

type HtmlEditor = (
  options: { [key: string]: any },
  replaceTemplate?: string
) => {
  html: string;
  text: string;
};
const htmlEditors = Object.keys(htmlTemplateFiles).reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue] = (
      options: { [key: string]: any } = {},
      replaceTemplate?: string
    ) => {
      const html = Object.keys(options).reduce(
        (a, cv) =>
          a.replace(new RegExp(`{{\\s*${cv}\\s*}}`, 'g'), `${options[cv]}`),
        typeof replaceTemplate === 'string'
          ? replaceTemplate
          : htmlTemplateFiles[currentValue].toString('utf8')
      );
      const text = htmlToText(html, { baseElement: 'body', wordwrap: null });
      return { html, text };
    };
    return accumulator;
  },
  {} as { [key: string]: HtmlEditor }
);

/**
 * html/email templates
 */
export const htmlMsgTemplates = htmlEditors as {
  /**
   * Example of the html message template
   */
  example: HtmlEditor;
};
