import { Request, Response } from 'express';

import User from '../models/user.model';
import comparePass from './helpers/comparePass';
import generateHash from './helpers/generateHash';
import generateJWT from './helpers/generateJWT';

const user = new User();

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send({
      message: 'firstname, lastname, email, and password are required',
    });
  }
  try {
    const checkUser = await user.getByEmail(email);
    if (checkUser) {
      return res.status(400).send({ message: 'User already exists' });
    }
  } catch (e) {
    console.log('Error wile validating user');
    res
      .status(500)
      .send({ message: 'An Error occurred while validating user' });
  }

  try {
    const hashedPassword = await generateHash(password);
    const newUser = { firstname, lastname, email, password: hashedPassword };
    const createdUser = await user.create(newUser);
    delete createdUser['password'];
    const token = generateJWT(createdUser);
    res.send(token);
  } catch (e) {
    console.log('Error wile registering user');
    res
      .status(500)
      .send({ message: 'An Error occurred while registering user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      message: 'email, and password are required',
    });
  }
  try {
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
    const token = generateJWT(checkUser);
    return res.send(token);
  } catch (e) {
    console.log('Error wile checking user');
    res.status(500).send({ message: 'An Error occurred while checking user' });
  }
};
