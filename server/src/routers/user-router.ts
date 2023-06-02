import express from 'express';
import userController from '../controllers/user-controller.js';
import { authGuard } from '../middlewares/authGuard.js';
import { privateGuard } from '../middlewares/privateGuard.js';
import { rolesGuard } from '../middlewares/rolesGuard.js';

const userRouter = express.Router();

userRouter.get('/', authGuard, rolesGuard('ADMIN'), userController.getAll);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/refresh-token', userController.refreshToken);
userRouter.post('/logout', userController.logout);
userRouter.get('/:id', authGuard, privateGuard, userController.getOne);
userRouter.patch('/:id', authGuard, privateGuard, userController.update);
userRouter.delete('/:id', authGuard, privateGuard, userController.delete);

export default userRouter;
