import Order from '../order.model';
import client from '../../database';

const order = new Order();

describe('Order Model', () => {
  beforeAll(async () => {
    try {
      const conn = await client.connect();
      const sql = `TRUNCATE users RESTART IDENTITY CASCADE;
                   INSERT INTO users (firstname, lastname, email, password) VALUES ('Mohamed', 'Hassan', 'mohamed@email.com', '123456');
                   INSERT INTO orders (status, user_id) VALUES('open', 1);`;
      await conn.query(sql);
    } catch (e) {
      console.log(
        'Error occurred while setting up database for Order Model tests'
      );
    }
  });

  it('should have a getByUser method', () => {
    expect(order.getByUser).toBeDefined();
  });
  it('should get the user order', async () => {
    try {
      const orderByUser = await order.getByUser('1');
      expect(orderByUser).toEqual({ id: 1, status: 'open', user_id: 1 });
    } catch (e) {
      console.log('Error occurred wile getting order in tests', e);
    }
  });
});
