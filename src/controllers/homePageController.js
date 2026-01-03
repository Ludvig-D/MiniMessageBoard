import { messages, newMessage } from '../modules/messagesdb.js';

function homepageGet() {
  (req, res) => {
    res.render('homepage', { messages: messages });
  };
}

function newMessageGet() {
  (req, res) => {
    res.render('form');
  };
}

function newMessagePost() {
  (req, res) => {
    const { text, user } = req.body;
    newMessage(text, user);

    res.redirect('/');
  };
}

export { homepageGet, newMessageGet, newMessagePost };
