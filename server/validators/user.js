module.exports = {
  signupIntro: (req) => {
    req.checkBody('firstName', 'Enter a First Name').notEmpty();
    req.checkBody('firstName', 'First Name must be alphanumeric text').isAlpha();
    req.sanitize('firstName').escape();
    req.sanitize('firstName').trim();

    req.checkBody('lastName', 'Enter a Last Name').notEmpty();
    req.checkBody('lastName', 'Last Name must be alphanumeric text').isAlpha();
    req.sanitize('lastName').escape();
    req.sanitize('lastName').trim();

    req.checkBody('email', 'Enter an Email').notEmpty();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.checkBody('email', 'Invalid Email').isEmail();

    return req.validationErrors();
  },
};
