const config = require('./../../config/config');
const debug = require('debug')('controller:user');
const Response = require('./../models/response');
const UserModel = require('./../models/user');
const userValidators = require('./../validators/user');

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
  }
}

module.exports = new UserController();
