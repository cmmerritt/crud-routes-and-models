import { promises as fs } from 'fs';
import path from 'path';

export default (pool) => {
  return fs
    .readFile(
      `${path.dirname(new URL(import.meta.url).pathname)}/../sql/setup.sql`,
      {
        encoding: 'utf-8',
      }
    )
    .then((sql) => pool.query(sql));
};

// fix: absolute path: .readFile('C:/Users/Christiane/alchemy/career-track-1/crud-routes-and-models/sql/setup.sql'
// ?? `${__dirname}/../sql/setup.sql`

