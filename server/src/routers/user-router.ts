import express from 'express';
import userController from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.get('/', userController.getAll);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login); 
userRouter.post('/refresh-token', userController.refreshToken);
userRouter.post('/logout', userController.logout);
userRouter.get('/:id', userController.getOne); 
userRouter.patch('/:id', userController.update); 
userRouter.delete('/:id', userController.delete); // в ответе возвращать об успешности операции

export default userRouter;
