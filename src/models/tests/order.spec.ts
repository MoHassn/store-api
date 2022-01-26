import Order from '../order.model';

const order = new Order();

describe('Order Model', () => {
  it('should have a getByUser method', () => {
    expect(order.getByUser).toBeDefined();
  });
});
