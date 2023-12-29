import { readdirSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const dirSqlPath = pathJoin(__dirname, '../../templates/sql');

const sqlTemplateFiles = readdirSync(dirSqlPath)
  .filter((e) => typeof e === 'string' && /\.sql$/i.test(e))
  .reduce((accumulator, currentValue) => {
    accumulator[currentValue.replace(/\.sql$/i, '')] = readFileSync(
      pathJoin(dirSqlPath, currentValue)
    );
    return accumulator;
  }, {} as { [key: string]: Buffer });

type SqlEditor = (
  options: { [key: string]: any },
  replaceTemplate?: string
) => { sqlQuery: string };
const sqlEditors = Object.keys(sqlTemplateFiles).reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue] = (
      options: { [key: string]: any } = {},
      replaceTemplate?: string
    ) => {
      const sqlQuery = Object.keys(options).reduce(
        (a, cv) =>
          a.replace(new RegExp(`{{\\s*${cv}\\s*}}`, 'g'), `${options[cv]}`),
        typeof replaceTemplate === 'string'
          ? replaceTemplate
          : sqlTemplateFiles[currentValue].toString('utf8')
      );
      return { sqlQuery };
    };
    return accumulator;
  },
  {} as { [key: string]: SqlEditor }
);

/**
 * Sql/SMS templates
 */
export const sqlMsgTemplates = sqlEditors as {
  /**
   * Example of the sql message template
   */
  example: SqlEditor;
};
