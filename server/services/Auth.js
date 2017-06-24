const config = require('./../../config/config');
const debug = require('debug')('service:auth');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class AuthService {
  constructor() {
    this.tokenMiddleware = this.tokenMiddleware.bind(this);
    this.generateTempToken = this.generateTempToken.bind(this);
  }

  tokenMiddleware(guestRoutes) {
    return (req, res, next) => {
      if (req.method === 'OPTIONS' || req.url.indexOf('/api/') === -1) {
        return next();
      }
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
          debug('got wrong token', token);
          const error = new Error('Invalid credentials, please authorize');
          error.status = 401;
          next(error);
        } else {
          debug('success token for user', user);
          if (!user._id || !user.email) {
            debug('token user data mismatch', user);
            const error = new Error('Invalid credentials, please authorize');
            error.status = 401;
            next(error);
          }
          req.user = user;
          next();
        }
      });
    };
  }

  generateTempToken(done) {
    crypto.randomBytes(15, (err, buf) => {
      const token = !err ? buf.toString('hex') : '';
      done(err, token);
    });
  }
}

module.exports = new AuthService();
