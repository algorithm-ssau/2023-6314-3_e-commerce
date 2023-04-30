import express from 'express';
import { roleController } from '../controllers/roleController.js';

export const router = express.Router();

router.post('/', roleController.create);
router.get('/', roleController.getRoleByValue);
router.delete('/:id', roleController.delete);
