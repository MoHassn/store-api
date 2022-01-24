import { Request, Response } from 'express';

import User from '../models/user.model';
import comparePass from './helpers/comparePass';
import generateHash from './helpers/generateHash';

const user = new User();

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({
      message: 'firstName, lastName, email, and password are required',
    });
  }
  const checkUser = await user.getByEmail(email);
  if (checkUser) {
    return res.status(400).send({ message: 'User already exists' });
  }

  const hashedPassword = await generateHash(password);
  const newUser = { firstName, lastName, email, password: hashedPassword };
  const createdUser = await user.create(newUser);
  res.send(createdUser);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: 'email, and password are required',
    });
  }
  const checkUser = await user.getByEmail(email);
  if (!checkUser) {
    return res
      .status(400)
      .send({ message: 'email or password is not correct' });
  }
  // @ts-ignore
  const isTruePass = await comparePass(password, checkUser.password);
  console.log(isTruePass);
  if (!isTruePass) {
    return res
      .status(400)
      .send({ message: 'email or password is not correct' });
  }

  delete checkUser['password'];
  return res.send(checkUser);
};
