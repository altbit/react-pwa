const config = require('./../../config/config');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const debug = require('debug')('controller:user');
const JsonController = require('./Json');
const UserModel = require('./../models/User');
const signupIntroValidator = require('./../validators/user/signupIntro');
const signupCompleteValidator = require('./../validators/user/signupComplete');
const signInValidator = require('./../validators/user/signIn');

//get rid of it
var utils = require('../utils/index');
var email = require('../utils/email');

class UserController extends JsonController {
  constructor() {
    super();
    this.postSignupIntro = this.postSignupIntro.bind(this);
    this.postSignupComplete = this.postSignupComplete.bind(this);
    this.postSignIn = this.postSignIn.bind(this);
    this.getUser = this.getUser.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.generateTempToken = this.generateTempToken.bind(this);
  }

  postSignupIntro(req, res) {
    const validationErrors = signupIntroValidator(req);
    if (validationErrors.length) {
      return this.Response(res)
        .withValidationErrors(validationErrors);
    }

    const body = req.body;

    const user = new UserModel({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });

    this.generateTempToken((err, token) => {
      if (err) {
        return this.Response(res)
          .withError('Temp token generation error');
      }

      user.verifyEmailToken = token;
      user.verifyEmailTokenExpires = Date.now() + 3600000 * 24 * config.server.postmark.signupTokenExpireDays;
      user.isEmailVerified = false;
      user.save()
        .then((user) => {
          debug('User created');
          return this.Response(res)
            .withData(user);
        })
        .catch((mongoError) => {
          if (mongoError.name === 'MongoError' && mongoError.code === 11000) {
            return this.Response(res)
              .withValidationError('email', 'Email is already in use', body.email);
          }
          return this.Response(res)
            .withError(mongoError.message);
        });
    });
  }

  postSignupComplete(req, res) {
    const validationErrors = signupCompleteValidator(req);
    if (validationErrors.length) {
      return this.Response(res)
        .withValidationErrors(validationErrors);
    }

    const body = req.body;

    UserModel
      .findOne({
        'email': new RegExp(["^", body.email, "$"].join(""), "i"),
      })
      .then((user) => {
        if (!user || !user.verifyEmailToken || user.verifyEmailToken != body.verifyEmailToken) {
          return this.Response(res)
            .withError('Wrong email temp token');
        }

        user.password = bcrypt.hashSync(body.password, 10);
        user.save()
          .then((user) => {
            debug('User creation complete');

            //email.sendWelcomeEmail(user, req.headers.host);

            return this.Response(res)
              .withData({
                user: utils.getCleanUser(user),
              });
          })
          .catch((mongoError) => {
            return this.Response(res)
              .withError(mongoError.message);
          });
      })
      .catch((mongoError) => {
        return this.Response(res)
          .withError(mongoError.message);
      });
  }

  postSignIn(req, res) {
    const validationErrors = signInValidator(req);
    if (validationErrors.length) {
      return this.Response(res)
        .withValidationErrors(validationErrors);
    }

    const body = req.body;

    UserModel
      .findOne({
        'email': new RegExp(["^", body.email, "$"].join(""), "i"),
      })
      .then((user) => {
        if (!user) {
          return this.Response(res)
            .withValidationError('email', 'Email is not registered', body.email);
        }

        bcrypt.compare(body.password, user.password, (err, valid) => {
          if (!valid) {
            return this.Response(res)
              .withValidationError('password', 'Wrong password', body.password);
          }

          const token = utils.generateToken(user);
          return this.Response(res)
            .withData({
              user: utils.getCleanUser(user),
              token,
            });
        });
      })
      .catch((mongoError) => {
        return this.Response(res)
          .withValidationError('email', 'Email is not registered', body.email);
      });
  }

  getUser(req, res) {
    if (!req.user || !req.user._id) {
      return this.Response(res)
        .withError('Wrong user in token', 401);
    }

    return this.Response(res)
      .withData({
        user: utils.getCleanUser(user),
      });
  }

  confirmEmail(req, res) {
    const token = req.params.token;
    if (!token) {
      return this.Response(res)
        .withError('Invalid token', 401);
    }

    UserModel
      .findOne({
        verifyEmailToken: token,
        verifyEmailTokenExpires: {
          $gt: Date.now(),
        },
      })
      .then((user) => {
        if (!user) {
          return this.Response(res)
            .withError('User not found', 401);
        }

        user.isEmailVerified = true;
        user.verifyEmailToken = undefined;
        user.verifyEmailTokenExpires = undefined;

        user.save()
          .then((user) => {
            debug('User confirmed his email');

            return this.Response(res)
              .withData({
                user: utils.getCleanUser(user),
              });
          })
          .catch((mongoError) => {
            return this.Response(res)
              .withError(mongoError.message);
          });
      })
      .catch((mongoError) => {
        return this.Response(res)
          .withValidationError('email', 'Email is not registered', body.email);
      });
  }

  generateTempToken(done) {
    crypto.randomBytes(15, (err, buf) => {
      const token = buf.toString('hex');
      done(err, token);
    });
  }
}

module.exports = new UserController();
