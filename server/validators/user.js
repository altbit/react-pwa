module.exports = {
  signupIntro: (req) => {
    req.checkBody('firstName', 'Enter First Name').notEmpty();
    req.checkBody('firstName', 'First Name must be alphanumeric text').isAlpha();
    req.sanitize('firstName').escape();
    req.sanitize('firstName').trim();

    req.checkBody('lastName', 'Enter Last Name').notEmpty();
    req.checkBody('lastName', 'Last Name must be alphanumeric text').isAlpha();
    req.sanitize('lastName').escape();
    req.sanitize('lastName').trim();

    req.checkBody('email', 'Enter Email').notEmpty();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.checkBody('email', 'Invalid Email').isEmail();

    return req.validationErrors();
  },

  signupComplete: (req) => {
    req.checkBody('password', 'Enter Password').notEmpty();
    req.checkBody('password', 'Allowed legth is 4 to 20 letters').isLength({min: 4, max: 20});
    req.sanitize('password').escape();
    req.sanitize('password').trim();

    req.checkBody('passwordRepeat', 'Enter Password Confirmation').notEmpty();
    req.checkBody('passwordRepeat', 'Allowed legth is 4 to 20 letters').isLength({min: 4, max: 20});
    req.sanitize('passwordRepeat').escape();
    req.sanitize('passwordRepeat').trim();
    req.checkBody('passwordRepeat', 'Passwords are not equal').equals(req.body.password);

    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.sanitize('newsletter').escape();
    req.sanitize('verifyEmailToken').escape();

    return req.validationErrors();
  },
};
