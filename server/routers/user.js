const config = require('./../../config/config');
const debug = require('debug')('router:user');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var utils = require('../utils/index');
var email = require('../utils/email');
var expressJwt = require('express-jwt');

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

// OLD code, has to be rewrote

const User = require('./../models/user');

router.post('/users/signin', function(req, res) {
  User
    .findOne({
      email: req.body.email
    })
    .select({
      __v: 0,
      updatedAt: 0,
      createdAt: 0
    }) //make sure to not return password (although it is hashed using bcrypt)
    .exec(function(err, user) {
      if (err)
        throw err;

      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Email or Password is Wrong'
        });
      }


      bcrypt.compare(req.body.password, user.password, function(err, valid) {
        if (!valid) {
          return res.status(404).json({
            error: true,
            message: 'Email or Password is Wrong'
          });
        }

        //make sure to NOT pass password and anything sensitive inside token
        //Pass anything tht might be used in other parts of the app
        var token = utils.generateToken(user);

        user = utils.getCleanUser(user);

        res.json({
          user: user,
          token: token
        });
      });
    });
});


//get current user from token
router.get('/me/from/token', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  // decode token
  jwt.verify(token, config.server.jwt.secret, function(err, user) {
    if (err)
      throw err;

    //return user using the id from w/in JWTToken
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err)
        throw err;

      user = utils.getCleanUser(user); //dont pass password and stuff

      //note: you can renew token by creating new token(i.e. refresh it) w/ new expiration time at this point, but I'm passing the old token back.
      // var token = utils.generateToken(user);

      res.json({
        user: user,
        token: token
      });

    });
  });
});

router.get('/resendValidationEmail', expressJwt({
  secret: config.server.jwt.secret,
}), function(req, res, next) {

  User.findById({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      throw err;

    //send welcome email w/ verification token
    email.sendWelcomeEmail(user, req.headers.host, function(err) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.send({
          message: 'Email was resent'
        })
      }
    });
  });
});


//get current user from email-token(from w/in welcome email)
router.get('/validateEmail/:token', function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.params.token;
  if (!token) {
    return res.status(401).json({
      message: 'Must pass token'
    });
  }

  User.findOne({
    verifyEmailToken: req.params.token,
    verifyEmailTokenExpires: {
      $gt: Date.now()
    }
  }, function(err, user) {

    if (!user) {
      return res.status(404).json({
        message: 'Email token is not valid or has expired'
      });
    }

    user.isEmailVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpires = undefined;
    user.save(function(err) {
      user = utils.getCleanUser(user); //dont pass password and stuff
      var token = utils.generateToken(user);
      res.json({
        user: user,
        token: token
      });
    });
  });
});


module.exports = {
  router,
  tokenMiddleware,
};