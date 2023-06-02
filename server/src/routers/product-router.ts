import express from 'express';
import productController from '../controllers/product-controller.js';
import { authGuard } from '../middlewares/authGuard.js';
import { rolesGuard } from '../middlewares/rolesGuard.js';
import { privateGuard } from '../middlewares/privateGuard.js';

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/cart/:id', authGuard, privateGuard, productController.getAllInCart);
productRouter.get('/add-to-cart/:id', authGuard, privateGuard, productController.addToCart);
productRouter.get('/remove-from-cart/:id', authGuard, privateGuard, productController.removeFromCart);
productRouter.get('/change-product-count/:id', authGuard, privateGuard, productController.changeProductCount);
productRouter.post('/', authGuard, rolesGuard('ADMIN'), productController.create);
productRouter.get('/:id', productController.getOne);
productRouter.patch('/:id', authGuard, rolesGuard('ADMIN'), productController.update);
productRouter.delete('/:id', authGuard, rolesGuard('ADMIN'), productController.deleteOne);

export default productRouter;
