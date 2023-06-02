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
      const product = await productService.getOne(+req.body.productId);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, material, fineness, discount, count, category, size, photoUrl } = req.body;
      const product = await productService.create(
        new ProductDto(name, price, material, fineness, discount, count, category, photoUrl, size),
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, material, fineness, discount, count, category, size, photoUrl } = req.body;
      const product = await productService.update(
        +req.body.productId,
        new ProductDto(name, price, material, fineness, discount, count, category, photoUrl, size),
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.deleteOne(+req.body.productId);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async getAllInCart(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getProductsInCart(+req.params.id);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;
      const product = await productService.addProductToCart(+req.params.id, productId);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.body;
      const product = await productService.removeProductFromCart(+req.params.id, productId);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async changeProductCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, count } = req.body;
      const product = await productService.updateProductInCartCount(+req.params.id, productId, count);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
}

// productRouter.get('/cart/:id', authGuard, privateGuard, productController);
// productRouter.get('/add-to-cart/:id', authGuard, privateGuard, productController.getAll);
// productRouter.get('/remove-from-cart/:id', authGuard, privateGuard, productController.getAll);
// productRouter.get('/change-product-count/:id', authGuard, privateGuard, productController.getAll);

export default new ProductController();
