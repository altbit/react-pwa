import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import NavigateNextIcon from 'material-ui-icons/NavigateNext';

import TextField from './../../base/form/TextFieldWrapper';
import { isRequired, parseValidationErrors } from './../../base/form/validation';
import ContentBlock from './../../base/components/ContentBlock';

const styleSheet = createStyleSheet('RegistrationIntroForm', (theme) => ({
  footer: {
    paddingTop: 16,
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
      <ContentBlock sm>
        <form onSubmit={handleSubmit}>
          <Typography type="display1" gutterBottom>
            Registration
          </Typography>

          <Divider/>

          <Grid container>
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

          <Grid container justify='space-between' align='center' className={classes.footer}>
            <Grid item>
              <Typography type='body1'>
                Already have an account? <Link to='/login'>Sign In</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Button raised color='primary' type="submit">Continue <NavigateNextIcon /></Button>
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
