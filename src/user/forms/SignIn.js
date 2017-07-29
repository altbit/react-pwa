import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TouchAppIcon from 'material-ui-icons/Portrait';

import TextField from './../../base/form/Field/TextField';
import { isRequired } from './../../base/form/Field/validation';
import ContentBlock from './../../base/components/ContentBlock';

const styleSheet = createStyleSheet('SignInForm', (theme) => ({
  footer: {
    paddingTop: 16,
  },
  icon: {
    marginLeft: 8,
  },
}));

class SignInForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    validationErrors: PropTypes.object,
  };

  render() {
    const { classes, handleSubmit, validationErrors, isSubmitting } = this.props;

    return (
      <ContentBlock sm>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <Typography type='display1' gutterBottom>
                Sign In
              </Typography>
              <Divider/>
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                label='Email'
                name='email'
                required={true}
                validate={isRequired('Email')}
                fieldError={validationErrors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                label='Password'
                name='password'
                required={true}
                validate={isRequired('Password')}
                type='password'
                fieldError={validationErrors.password}
                />
            </Grid>

            <Grid item xs={12}>
              <Grid container justify='space-between' align='center' className={classes.footer}>
                <Grid item>
                  <Typography type='body1'>
                    Don't have an account? <Link to='/register'>Register</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Button raised color='primary' type='submit' disabled={isSubmitting}>
                    Sign In <TouchAppIcon  className={classes.icon}/>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </ContentBlock>
    );
  }
}

export default reduxForm({
  form: 'signIn',
})(
  withStyles(styleSheet)(
    SignInForm
  )
);
