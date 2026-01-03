import express from 'express';
import path from 'path';

import route from './routes/homePageRouter.js';

const PORT = 3000;

const app = express();

app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', route);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening to http://localhost:${PORT}`);
});
