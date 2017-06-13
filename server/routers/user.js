const config = require('./../../config/config');
const debug = require('debug')('router:user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const UserController = require('./../controllers/user');

const tokenMiddleware = (guestRoutes) => (req, res, next) => {
  var token = req.headers['authorization'];
  if (guestRoutes.reduce((isMatched, current) => {
      if (req.url.indexOf(current) !== -1) {
        return true;
      }
      return isMatched;
    }, false)
  ) {
    return next();
  }

  jwt.verify(token, config.server.jwt.secret, (err, user) => {
    if (err) {
      const error = new Error('Invalid credentials, please authorize');
      error.status = 401;
      next(error);
    } else {
      debug('success token for user', user);
      req.user = user;
      next();
    }
  });
};

router.post('/users/signup/intro', UserController.postSignupIntro);
router.post('/users/signup/complete', UserController.postSignupComplete);
router.post('/users/signin', UserController.postSignIn);
router.get('/user', UserController.getUser);
router.get('/user/confirmEmail/:token', UserController.confirmEmail);

module.exports = {
  router,
  tokenMiddleware,
};