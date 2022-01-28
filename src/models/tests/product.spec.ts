import Product from '../product.model';
import client from '../../database';

const product = new Product();

beforeAll(async () => {
  try {
    const conn = await client.connect();
    const sql = `TRUNCATE products RESTART IDENTITY CASCADE;
                 INSERT INTO products
                 (name, price, category)
                 VALUES
                 ('Test', 25, 'phone'),
                 ('Test2', 76, 'tv');`;
    await conn.query(sql);
  } catch (e) {
    console.log(
      'Error occurred while setting up database for Product Model tests'
    );
  }
});

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(product.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(product.create).toBeDefined();
  });
  it('should index all products', async () => {
    try {
      const allProducts = await product.index();
      expect(allProducts).toEqual([
        { id: 1, name: 'Test', price: 25, category: 'phone' },
        { id: 2, name: 'Test2', price: 76, category: 'tv' },
      ]);
    } catch (e) {
      console.log('Error occurred wile getting all products in tests', e);
    }
  });
  it('should show a product with id', async () => {
    try {
      const productById = await product.show('1');
      expect(productById).toEqual({
        id: 1,
        name: 'Test',
        price: 25,
        category: 'phone',
      });
    } catch (e) {
      console.log('Error occurred wile getting product by id in tests', e);
    }
  });
  it('should create a product', async () => {
    try {
      const newProduct = await product.create({
        name: 'Test3',
        price: 10,
        category: 'phone',
      });
      expect(newProduct).toEqual({
        id: 3,
        name: 'Test3',
        price: 10,
        category: 'phone',
      });
    } catch (e) {
      console.log('Error occurred wile creating product in tests', e);
    }
  });
});
