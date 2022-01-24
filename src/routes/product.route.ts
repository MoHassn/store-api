import { Router } from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/product.controller';

const product = Router();

product.get('/', getAllProducts);
product.get('/:id', getProduct);
product.post('/', createProduct);

export default product;
