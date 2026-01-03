import { Router } from 'express';
import userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', userController.usersListGet);

userRouter.get('/create', userController.userCreateGet);
userRouter.post('/create', userController.userCreatePost);

export default userRouter;
