import { Request, Response } from 'express';
import Order from '../models/order.model';

const order = new Order();

export const getUserOpenOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const openOrder = await order.getByUser(id);
    res.send(openOrder);
  } catch (e) {
    console.log("Error wile getting user's order");
    res
      .status(500)
      .send({ message: "An Error occurred while getting user's order" });
  }
};
