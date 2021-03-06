import client from '../database';

export type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
};

export type NewUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default class User {
  async index(): Promise<UserType[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstname, lastname, email from users';
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
      const sql =
        'SELECT id, firstname, lastname, email from users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(
        `An Error occurred while getting user with id: ${id}: ${e}`
      );
    }
  }
  async getByEmail(email: string): Promise<UserType> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from users WHERE email=($1)';
      const result = await conn.query(sql, [email]);
      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(
        `An Error occurred while getting user with id: ${email}: ${e}`
      );
    }
  }

  async create(user: NewUser): Promise<UserType> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users(firstname, lastname, password, email) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email, password';
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.password,
        user.email,
      ]);
      await conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`An Error occurred while creating user: ${e}`);
    }
  }
}
