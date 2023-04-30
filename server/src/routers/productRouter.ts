import express from 'express';
import { productController } from '../controllers/productController.js';

export const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.post('/add-to-cart/:id', productController.addToCart);
router.post('/add-to-recent/:id', productController.addToRecent);
router.post('/mark-as-favorite/:id', productController.markAsFavorite);
router.post('/purchase/:id', productController.purchase);
router.post('/create', productController.create);
router.patch('/:id', productController.update);
router.delete('/:id', productController.delete);
