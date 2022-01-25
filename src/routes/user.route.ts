import { Router } from 'express';
import { register } from '../controllers/auth.controller';
import { getAllUsers, getUser } from '../controllers/user.controller';
import { getUserOpenOrder } from '../controllers/order.controller';
import requiresAuth from '../middlewares/auth.middleware';

const user = Router();

user.get('/', requiresAuth, getAllUsers);
user.get('/:id', requiresAuth, getUser);
user.post('/', requiresAuth, register);
user.get('/:id/current-order', requiresAuth, getUserOpenOrder);

export default user;
