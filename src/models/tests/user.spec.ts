import User from '../user.model';
import client from '../../database';

const user = new User();

describe('User Model', () => {
  beforeAll(async () => {
    try {
      const conn = await client.connect();
      const sql = `TRUNCATE users RESTART IDENTITY CASCADE;
                   INSERT INTO users
                   (firstname, lastname, email, password)
                   VALUES
                   ('Mohamed', 'Hassan', 'user@gmail.com', '2133'),
                   ('Adham', 'Hassan', 'user2@gmail.com', '2533');`;
      await conn.query(sql);
    } catch (e) {
      console.log(
        'Error occurred while setting up database for User Model tests'
      );
    }
  });
  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(user.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(user.create).toBeDefined();
  });
  it('should have a getByEmail method', () => {
    expect(user.getByEmail).toBeDefined();
  });
  it('should index all users', async () => {
    try {
      const allUsers = await user.index();
      expect(allUsers).toEqual([
        {
          id: 1,
          firstname: 'Mohamed',
          lastname: 'Hassan',
          email: 'user@gmail.com',
        },
        {
          id: 2,
          firstname: 'Adham',
          lastname: 'Hassan',
          email: 'user2@gmail.com',
        },
      ]);
    } catch (e) {
      console.log('Error occurred wile getting all products in tests', e);
    }
  });
  it('should show a user with id', async () => {
    try {
      const userById = await user.show('1');
      expect(userById).toEqual({
        id: 1,
        firstname: 'Mohamed',
        lastname: 'Hassan',
        email: 'user@gmail.com',
      });
    } catch (e) {
      console.log('Error occurred wile getting user by id in tests', e);
    }
  });
  it('should create a user', async () => {
    try {
      const newuser = await user.create({
        firstname: 'Mohamed',
        lastname: 'Hassan',
        email: 'newemail@gmail.com',
        password: '123456',
      });
      expect(newuser).toEqual({
        id: 3,
        firstname: 'Mohamed',
        lastname: 'Hassan',
        email: 'newemail@gmail.com',
        password: '123456',
      });
    } catch (e) {
      console.log('Error occurred wile creating user in tests', e);
    }
  });
  it('should getByEmail', async () => {
    try {
      const userByEmail = await user.getByEmail('user@gmail.com');
      expect(userByEmail).toEqual({
        id: 1,
        firstname: 'Mohamed',
        lastname: 'Hassan',
        email: 'user@gmail.com',
        password: '2133',
      });
    } catch (e) {}
  });
});
