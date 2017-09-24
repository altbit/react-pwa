import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import NavigateNextIcon from 'material-ui-icons/NavigateNext';

import TextField from './../../base/form/Field/TextField';
import { isRequired } from './../../base/form/Field/validation';
import ContentBlock from './../../base/components/ContentBlock';

const styleSheet = theme => ({
  content: {
    paddingTop: 16,
  },
  footer: {
    paddingTop: 16,
  },
});

class RegistrationIntroForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    validationErrors: PropTypes.object,
  };

  render() {
    const { classes, handleSubmit, validationErrors } = this.props;

    return (
      <ContentBlock sm>
        <form onSubmit={handleSubmit}>
          <Typography type='display1' gutterBottom>
            Registration
          </Typography>

          <Divider/>

          <Grid container className={classes.content}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                label='First Name'
                name='firstName'
                required={true}
                validate={isRequired('First Name')}
                fieldError={validationErrors.firstName}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                label='Last Name'
                name='lastName'
                required={true}
                validate={isRequired('Last Name')}
                fieldError={validationErrors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                label='E-mail'
                name='email'
                required={true}
                validate={isRequired('E-mail')}
                fieldError={validationErrors.email}
              />
            </Grid>
          </Grid>

          <Grid container justify='space-between' align='center' className={classes.footer}>
            <Grid item>
              <Typography type='body1'>
                Already have an account? <Link
                  to={{
                    pathname: '/login',
                    state: { from: '/register' },
                  }}
                >Sign In</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Button raised color='primary' type='submit'>Continue <NavigateNextIcon /></Button>
            </Grid>
          </Grid>
        </form>
      </ContentBlock>
    );
  }
}

export default reduxForm({
  form: 'registrationIntro',
})(withStyles(styleSheet)(RegistrationIntroForm));
