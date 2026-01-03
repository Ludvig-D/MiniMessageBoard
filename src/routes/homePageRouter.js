import { Router } from 'express';

const route = Router();

import { messages, newMessage } from '../modules/messagesdb.js';

route.get('/', (req, res) => {
  res.render('homepage', { messages: messages });
});

route.get('/new', (req, res) => {
  res.render('form');
});

route.post('/new', (req, res) => {
  const { text, user } = req.body;
  newMessage(text, user);

  res.redirect('/');
});

export default route;
