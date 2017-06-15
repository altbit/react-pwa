module.exports = (req) => {
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
};
