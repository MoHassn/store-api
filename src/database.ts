import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_NAME, TEST_DB_NAME, DB_USER, DB_PASSWORD, ENV } =
  process.env;

let client: Pool;

if (ENV == 'dev') {
  client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}
if (ENV === 'test') {
  client = new Pool({
    host: DB_HOST,
    database: TEST_DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
}
// @ts-ignore
export default client;
