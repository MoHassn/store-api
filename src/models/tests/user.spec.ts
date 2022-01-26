import User from '../user.model';

const user = new User();

describe('User Model', () => {
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
});
