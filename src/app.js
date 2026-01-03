import express from 'express';
import path from 'path';

import homepageRouter from './routes/homePageRouter.js';
import userRouter from './routes/userRouter.js';

const PORT = 3000;

const app = express();

app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', homepageRouter);
app.use('/user', userRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening to http://localhost:${PORT}`);
});
