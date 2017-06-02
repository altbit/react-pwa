module.exports = {
  signupIntro: (values) => {
    const errors = [];

    if (!(values.firstName
      && values.firstName.trim() !== ''
    )) {
      errors.push({ firstName: 'Enter a First Name' });
    } else if (!/^[\w\'\-]{2,}$/.test(values.firstName)) {
      errors.push({ firstName: 'Invalid First Name' });
    }

    if (!(values.lastName
      && values.lastName.trim() !== ''
    )) {
      errors.push({ lastName: 'Enter a Last Name' });
    } else if (!/^[\w\'\-]{2,}$/.test(values.lastName)) {
      errors.push({ lastName: 'Invalid Last Name' });
    }

    if (!(values.email
      && values.email.trim() !== ''
    )) {
      errors.push({ email: 'Enter an Email' });
    } else if (!/^[A-Z0-9a-z\._\%\+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,5}$/.test(values.email)) {
      errors.push({ email: 'Invalid Email' });
    }

    return errors;
  },
};
