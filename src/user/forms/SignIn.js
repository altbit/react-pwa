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
import { LabelCheckbox } from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';

import TextField from './../../base/form/TextFieldWrapper';
import { isRequired } from './../../base/form/validation';
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
          <Typography type='display1' gutterBottom>
            Sign In
          </Typography>

          <Divider/>

          <Grid container>
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
          </Grid>

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
