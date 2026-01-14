import express from 'express';
import 'dotenv/config';

import homepageRouter from './routes/homePageRouter.js';
import userRouter from './routes/userRouter.js';

const PORT = process.env.PORT;

const app = express();

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', homepageRouter);
app.use('/user', userRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening to http://localhost:${PORT}`);
});
