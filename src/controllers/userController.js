import usersDB from '../modules/userdb.js';

import { body, validationResult, matchedData } from 'express-validator';

const alphaErr = 'must only contain letters.';
const numberErr = 'must only contain numbers.';
const lengthErr = 'must be between 1 and 10 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
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
    (req, res) => {
      res.render('userList', { title: 'User list', users: usersDB.getUsers() });
    },
  ];

  userCreateGet = [
    (req, res) => {
      res.render('userCreating', { title: 'Create User' });
    },
  ];

  userCreatePost = [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).render('userCreating', {
          title: 'Create User',
          errors: errors.array(),
        });
      }

      const { firstName, lastName, email, age, bio } = matchedData(req);
      usersDB.addUser({ firstName, lastName, email, age, bio });
      res.redirect('/user');
    },
  ];

  userUpdateGet = [
    (req, res) => {
      const user = usersDB.getUser(req.params.id);
      res.render('userUpdate', { title: 'Update User', user: user });
    },
  ];

  userUpdatePost = [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const user = usersDB.getUser(req.params.id);
        return res.status(404).render('userUpdate', {
          title: 'Update User',
          user: user,
          errors: errors.array(),
        });
      }

      const { firstName, lastName, email, age, bio } = matchedData(req);
      usersDB.updateUser(req.params.id, {
        firstName,
        lastName,
        email,
        age,
        bio,
      });
      res.redirect('/user');
    },
  ];

  userDelete = [
    (req, res) => {
      usersDB.deleteUser(req.params.id);
      res.redirect('/user');
    },
  ];
}

export default new userController();
