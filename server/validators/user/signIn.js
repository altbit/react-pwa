module.exports = (req) => {
  req.checkBody('email', 'Enter Email').notEmpty();
  req.sanitize('email').escape();
  req.sanitize('email').trim();
  req.checkBody('email', 'Invalid Email').isEmail();

  req.checkBody('password', 'Enter Password').notEmpty();
  req.sanitize('password').escape();
  req.sanitize('password').trim();

  req.sanitize('rememberMe').escape();

  return req.validationErrors();
};
