import { Request, Response } from 'express';
import Order from '../models/order.model';

const order = new Order();

export const getUserOpenOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const openOrder = await order.getByUser(id);
  res.send(openOrder);
};
