import { getAllMessages, insertMessage } from '../db/queries/messages.sql.js';

class homepageController {
  homepageGet = [
    async (req, res) => {
      const messages = await getAllMessages();
      res.render('homepage', { messages });
    },
  ];

  newMessageGet = [
    (req, res) => {
      res.render('partials/form');
    },
  ];

  newMessagePost = [
    async (req, res) => {
      const { text, user_id } = req.body;
      await insertMessage(text, user_id);
      res.redirect('/');
    },
  ];
}

export default new homepageController();
