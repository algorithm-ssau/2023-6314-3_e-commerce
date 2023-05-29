import express from 'express';
import productController from '../controllers/product-controller.js';
import { authGuard } from '../middlewares/authGuard.js';
import { rolesGuard } from '../middlewares/rolesGuard.js';

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.post('/', authGuard, rolesGuard('ADMIN'), productController.create);
productRouter.get('/:id', productController.getOne);
productRouter.patch('/:id', authGuard, rolesGuard('ADMIN'), productController.update);
productRouter.delete('/:id', authGuard, rolesGuard('ADMIN'), productController.deleteOne);

export default productRouter;
