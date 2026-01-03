import { Router } from 'express';
import homepageController from '../controllers/homePageController.js';

const homepageRouter = Router();

homepageRouter.get('/', homepageController.homepageGet);

homepageRouter.get('/new', homepageController.newMessageGet);

homepageRouter.post('/new', homepageController.newMessagePost);

export default homepageRouter;
