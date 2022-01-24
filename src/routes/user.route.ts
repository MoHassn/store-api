import { Router } from 'express';
import { getAllUsers, getUser } from '../controllers/user.controller';

const user = Router();

user.get('/', getAllUsers);
user.get('/:id', getUser);

export default user;
