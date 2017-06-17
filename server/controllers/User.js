const config = require('./../../config/config');
const debug = require('debug')('controller:user');
const bcrypt = require('bcrypt');

const AuthService = require('./../services/Auth');
const MailService = require('./../services/Mail');
const JsonController = require('./Json');
const UserModel = require('./../models/User');
const signupIntroValidator = require('./../validators/user/signupIntro');
const signupCompleteValidator = require('./../validators/user/signupComplete');
const signInValidator = require('./../validators/user/signIn');

class UserController extends JsonController {
  constructor() {
    super();
    this.postSignupIntro = this.postSignupIntro.bind(this);
    this.postSignupComplete = this.postSignupComplete.bind(this);
    this.postSignIn = this.postSignIn.bind(this);
    this.getUser = this.getUser.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
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

    AuthService.generateTempToken((err, token) => {
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
          return this.onMongoError(mongoError);
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

            MailService.sendWelcome(user);

            return this.Response(res)
              .withData({
                user: user.getClean(),
              });
          })
          .catch(this.onMongoError(res));
      })
      .catch(this.onMongoError(res));
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

          return this.Response(res)
            .withData({
              user: user.getClean(),
              token: user.generateToken(),
            });
        });
      })
      .catch(this.onMongoError(res));
  }

  getUser(req, res) {
    UserModel
      .findOne({
        _id: req.user._id,
      })
      .then((user) => {
        if (!user) {
          return this.Response(res)
            .withError('User is not found', 401);
        }

        return this.Response(res)
          .withData({
            user: user.getClean(),
          });
      })
      .catch(this.onMongoError(res));
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
                user: user.getClean(),
              });
          })
          .catch(this.onMongoError(res));
      })
      .catch(this.onMongoError(res));
  }
}

module.exports = new UserController();
