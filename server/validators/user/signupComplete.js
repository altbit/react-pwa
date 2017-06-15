module.exports = (req) => {
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
};
