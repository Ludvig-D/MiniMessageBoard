import { getAllMessages } from '../db/queries/messages.sql.js';

class homepageController {
  homepageGet = [
    async (req, res) => {
      const messages = await getAllMessages();
      console.log(messages);
      res.render('homepage', { messages });
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
