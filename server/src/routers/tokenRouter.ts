import express from 'express';
import { tokenController } from '../controllers/tokenController.js';

export const router = express.Router();

router.post('/', tokenController.create);
router.post('/refresh', tokenController.refresh);
router.delete('/:id', tokenController.delete);
