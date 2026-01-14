import {
  deleteUser,
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  searchUsers,
} from '../db/queries/users.sql.js';
import usersDB from '../modules/userdb.js';

import { body, validationResult, matchedData } from 'express-validator';

const alphaErr = 'must only contain letters.';
const numberErr = 'must only contain numbers.';
const lengthErr = 'must be between 1 and 10 characters.';

const validateUser = [
  body('username')
    .trim()
    .isAlpha()
    .withMessage(`Username ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Username ${lengthErr}`),
  body('email').trim().isEmail().withMessage('Email must be a email.'),
  body('age')
    .trim()
    .optional({ values: 'falsy' })
    .isNumeric()
    .withMessage(`Age ${numberErr}`)
    .isLength()
    .withMessage(`Age ${lengthErr}`),
  body('bio')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ max: 200 })
    .withMessage('Bio must only contian 200 characters.'),
];

class userController {
  usersListGet = [
    async (req, res) => {
      const users = await getAllUsers();
      res.render('userList', { title: 'User list', users });
    },
  ];

  userGet = [
    async (req, res) => {
      const user = await getUser([req.params.id]);
      res.render(`partials/user`, { user });
    },
  ];

  userCreateGet = [
    (req, res) => {
      res.render('userCreating', { title: 'Create User' });
    },
  ];

  userCreatePost = [
    validateUser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).render('userCreating', {
          title: 'Create User',
          errors: errors.array(),
        });
      }
      await insertUser(matchedData(req));
      res.redirect('/user');
    },
  ];

  userUpdateGet = [
    async (req, res) => {
      const user = await getUser([req.params.id]);
      res.render('userUpdate', { title: 'Update User', user: user });
    },
  ];

  userUpdatePost = [
    validateUser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        const user = usersDB.getUser(req.params.id);
        return res.status(404).render('userUpdate', {
          title: 'Update User',
          user: user,
          errors: errors.array(),
        });
      }

      await updateUser(req.params.id, matchedData(req));
      res.redirect('/user');
    },
  ];

  userDelete = [
    async (req, res) => {
      await deleteUser(req.params.id);
      res.redirect('/user');
    },
  ];

  userSearch = [
    async (req, res) => {
      let users = await searchUsers(req.query.q);
      console.log(users);
      if (users.length === 0) {
        res.render('userList', {
          title: 'User List',
          users: await getAllUsers(),
          errors: [{ msg: 'No users under that name' }],
        });
        return;
      }
      res.render(`searchUsers`, { users: users });
    },
  ];
}

export default new userController();
