/*
productRouter.get('/');
productRouter.post('/');
productRouter.get('/:id');
productRouter.patch('/:id');
productRouter.delete('/:id');
*/

import { Request, Response, NextFunction } from 'express';
import productService from '../services/product-service.js';
import { ProductDto } from '../dtos/product.dto.js';

class ProductController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.getOne(+id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, material, fineness, discount, count, category, size } = req.body;
      const product = await productService.create(
        new ProductDto(name, price, material, fineness, discount, count, category, size),
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, material, fineness, discount, count, category, size } = req.body;
      const product = await productService.update(
        +req.params.id,
        new ProductDto(name, price, material, fineness, discount, count, category, size),
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.deleteOne(+req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
