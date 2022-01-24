import { Request, Response } from 'express';
import Product from '../models/product.model';

const product = new Product();

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await product.index();
  res.send(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productWithID = await product.show(id);
  res.send(productWithID);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  const newProduct = { name, price, category };
  const createdProduct = await product.create(newProduct);

  res.send(createdProduct);
};
