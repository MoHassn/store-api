import client from '../database';

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
};

export default class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstName, lastName from users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (e) {
      throw new Error(`An Error occurred while getting users: ${e}`);
    }
  }
  async show(id: string): Promise<UserType> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstName, lastName from users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(
        `An Error occurred while getting user with id: ${id}: ${e}`
      );
    }
  }
}
