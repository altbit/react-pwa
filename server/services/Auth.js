class AuthService {
  constructor() {
    this.tokenMiddleware = this.tokenMiddleware.bind(this);
  }

  tokenMiddleware(guestRoutes) {
    return (req, res, next) => {
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
  }
}

module.exports = new AuthService();
