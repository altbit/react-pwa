import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import TextField, { isRequired, parseValidationErrors } from './../../base/form/TextField';
import Button from 'material-ui/Button';

class RegistrationIntroForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.object,
  };

  render() {
    const { handleSubmit, submitError } = this.props;
    const errors = parseValidationErrors(submitError);

    return (
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              label="First Name"
              name="firstName"
              required={true}
              validate={isRequired('First Name')}
              fieldError={errors.firstName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Field
              component={TextField}
              label="Last Name"
              name="lastName"
              required={true}
              validate={isRequired('Last Name')}
              fieldError={errors.lastName}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              component={TextField}
              label="E-mail"
              name="email"
              required={true}
              validate={isRequired('E-mail')}
              fieldError={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            Already have an account? <Link to='/login'>Login</Link>
          </Grid>

          <Grid item xs={12}>
            <Button raised primary type="submit">Get started</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registrationIntro',
})(RegistrationIntroForm);
