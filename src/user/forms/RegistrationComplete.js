import { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import CloudDoneIcon from 'material-ui-icons/CloudDone';
import { LabelCheckbox } from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';

import TextField from './../../base/form/TextFieldWrapper';
import { isRequired, parseValidationErrors } from './../../base/form/validation';
import ContentBlock from './../../base/components/ContentBlock';

const styleSheet = createStyleSheet('RegistrationCompleteForm', (theme) => ({
  content: {
    paddingTop: 16,
  },
  footer: {
    paddingTop: 16,
  },
  icon: {
    marginLeft: 8,
  },
}));

class RegistrationCompleteForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func,
    userData: PropTypes.object,
    submitError: PropTypes.object,
  };

  onNewsletterSwitch = (event, checked) => {
    const { change } = this.props;
    change('newsletter', checked);
  };

  render() {
    const { classes, handleSubmit, userData, submitError } = this.props;
    const errors = parseValidationErrors(submitError);

    return (
      <ContentBlock sm>
        <form onSubmit={handleSubmit}>
          <Typography type='display1'>
            Complete registration
          </Typography>
          <Typography type='subheading' gutterBottom>
            Hi {userData.firstName}, please set up your password
          </Typography>

          <Divider/>

          <Grid container className={classes.content}>
            <Grid item xs={12}>
              <Field
                component={TextField}
                label='Password'
                name='password'
                required={true}
                validate={isRequired('Password')}
                type='password'
                fieldError={errors.password}
                />
            </Grid>

            <Grid item xs={12}>
              <Field
                component={TextField}
                label='Repeat password'
                name='passwordRepeat'
                required={true}
                validate={isRequired('Password again')}
                type='password'
                fieldError={errors.passwordRepeat}
                />
            </Grid>

            <Grid item xs={12}>
              <FormGroup row>
                <LabelCheckbox
                  name='newsletter'
                  label='I would like to receive newsletter'
                  onChange={this.onNewsletterSwitch}
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Divider/>

          <Grid container justify='space-between' align='center' className={classes.footer}>
            <Grid item>
              <Typography type='body1'>
                By clicking submit you agree<br />to our <Link to='/terms'>Terms and Conditions</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Button raised color='primary' type='submit'>Complete registration  <CloudDoneIcon  className={classes.icon}/></Button>
            </Grid>
          </Grid>
        </form>
      </ContentBlock>
    );
  }
}

export default reduxForm({
  form: 'registrationComplete',
  initialValues: {
    newsletter: false,
  },
})(
  withStyles(styleSheet)(
    RegistrationCompleteForm
  )
);
