import { messages, newMessage } from '../modules/messagesdb.js';

class homepageController {
  homepageGet = [
    (req, res) => {
      res.render('homepage', { messages: messages });
    },
  ];

  newMessageGet = [
    (req, res) => {
      res.render('form');
    },
  ];

  newMessagePost = [
    (req, res) => {
      const { text, user } = req.body;
      newMessage(text, user);

      res.redirect('/');
    },
  ];
}

export default new homepageController();
