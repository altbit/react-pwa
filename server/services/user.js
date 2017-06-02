const config = require('./../../config/config');
const debug = require('debug')('service:user');
const Response = require('./../models/response');
const UserModel = require('./../models/user');
const userValidators = require('./../validators/user');

class UserService {
  constuctor() {
    this.signupIntro = this.signupIntro.bind(this);
  }

  signupIntro(request, response) {
    const body = request.body;

    const validationErrors = userValidators.signupIntro(body);
    if (validationErrors.length) {
      return new Response(response)
        .validation(validationErrors);
    }

    const user = new UserModel({
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
    });

    user.save()
      .then((user) => {
        debug('User created');
        new Response(response)
          .data(user);
      })
      .catch((mongoError) => {
        if (mongoError.name === 'MongoError' && mongoError.code === 11000) {
          return new Response(response)
            .validation(
              [{ email: 'Email is already in use' }]
            );
        }
        new Response(response)
          .error(mongoError.message);
      });
  }
}

module.exports = new UserService();
