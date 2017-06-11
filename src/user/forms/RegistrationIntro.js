import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import TextField, { isRequired, parseValidationErrors } from './../../base/form/TextField';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('RegistrationIntroForm', (theme) => ({
  root: {
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.breakpoints.getWidth('sm'),
    },
  },
  submit: {
    display: 'inline-block',
    marginLeft: 'auto',
  },
}));

class RegistrationIntroForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.object,
  };

  render() {
    const { classes, handleSubmit, submitError } = this.props;
    const errors = parseValidationErrors(submitError);

    return (
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Field
              component={TextField}
              label="First Name"
              name="firstName"
              required={true}
              validate={isRequired('First Name')}
              fieldError={errors.firstName}
            />
          </Grid>

          <Grid item xs={12}>
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
        </Grid>

        <Divider/>

        <Grid container justify='space-between' align='center'>
          <Grid item>
            Already have an account? <Link to='/login'>Login</Link>
          </Grid>
          <Grid item>
            <Button raised primary type="submit">Get started</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registrationIntro',
})(withStyles(styleSheet)(RegistrationIntroForm));
