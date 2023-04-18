import express from 'express';
import {userController} from '../controllers/userController.js'

export const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login-admin', userController.loginAdmin);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);
