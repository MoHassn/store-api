import { Request, Response } from 'express';
import User from '../models/user.model';

const user = new User();

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await user.index();
  res.send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userWithID = await user.show(id);
  res.send(userWithID);
};
