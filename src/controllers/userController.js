import usersDB from '../modules/userdb.js';

import { body, validationResult, matchedData } from 'express-validator';

const alphaErr = 'must only contain letters.';
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
];

function usersListGet() {
  (req, res) => {
    res.render('userList', { title: 'User list', users: usersDB.getUsers() });
  };
}

function userCreateGet() {
  (req, res) => {
    res.render('userCreating', { title: 'Create User' });
  };
}

function userCreatePost() {
  validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).render('userCreating', {
          title: 'Create User',
          errors: errors.array(),
        });
      }

      const { firstName, lastName } = matchedData(req);
      usersDB.addUser({ firstName, lastName });
      res.redirect('/user');
    };
}

export { usersListGet, userCreateGet, userCreatePost };
