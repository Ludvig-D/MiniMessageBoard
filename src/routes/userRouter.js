import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', userController.usersListGet);

userRouter.get('/create', userController.userCreateGet);
userRouter.get('/create', userController.userCreatePost);

export default userRouter;
