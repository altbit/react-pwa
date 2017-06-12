const config = require('./../../config/config');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const debug = require('debug')('controller:user');
const Response = require('./../models/response');
const UserModel = require('./../models/user');
const userValidators = require('./../validators/user');

//delete it
var utils = require('../utils/index');
var email = require('../utils/email');

class UserController {
  constuctor() {
    this.postSignupIntro = this.postSignupIntro.bind(this);
  }

  postSignupIntro(req, res) {
    const validationErrors = userValidators.signupIntro(req);
    if (validationErrors.length) {
      return new Response(res)
        .validationErrors(validationErrors);
    }

    const body = req.body;

    const user = new UserModel({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    });

    this.generateTempToken((err, token) => {
      if (!err) {
        new Response(res)
          .error('Temp token generation error');
      }

      user.verifyEmailToken = token;
      user.verifyEmailTokenExpires = Date.now() + 3600000 * 24 * config.server.postmark.signupTokenExpireDays;
      user.isEmailVerified = false;
      user.save()
        .then((user) => {
          debug('User created');
          new Response(res)
            .data(user);
        })
        .catch((mongoError) => {
          if (mongoError.name === 'MongoError' && mongoError.code === 11000) {
            return new Response(res)
              .validationError('email', 'Email is already in use', body.email);
          }
          new Response(res)
            .error(mongoError.message);
        });
    });
  }

  postSignupComplete(req, res) {
    const validationErrors = userValidators.signupComplete(req);
    if (validationErrors.length) {
      return new Response(res)
        .validationErrors(validationErrors);
    }

    const body = req.body;

    UserModel
      .findOne({
        'email': new RegExp(["^", body.email, "$"].join(""), "i")
      })
      .then((user) => {
        if (!user || !user.verifyEmailToken || user.verifyEmailToken != body.token) {
          return new Response(res)
            .error('Wrong email temp token');
        }

        user.password = bcrypt.hashSync(body.password, 10);
        user.save()
          .then((user) => {
            debug('User creation complete');

            //email.sendWelcomeEmail(user, req.headers.host);

            const token = utils.generateToken(user);
            new Response(res)
              .data({
                user: utils.getCleanUser(user),
                token,
              });
          })
          .catch((mongoError) => {
            new Response(res)
              .error(mongoError.message);
          });
      })
      .catch((mongoError) => {
        new Response(res)
          .error(mongoError.message);
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
