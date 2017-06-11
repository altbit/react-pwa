import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import { LabelCheckbox } from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';

import ContentBlock from './../../base/components/ContentBlock';
import RegistrationIntroForm from './../forms/RegistrationIntro';

import { postIntro } from './../actions/registration';

class RegistrationContainer extends Component {
  static propTypes = {
    onPostIntro: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    introSubmitted: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  onSubmit = (values) => {
    const { onPostIntro } = this.props;
    onPostIntro(values);
  };

  //renderComplete() {
  //  return (
  //    <Grid container>
  //      <Grid item xs={12}>
  //        Hi {this.state.firstName} {this.state.lastName} ({this.state.email})
  //      </Grid>
  //
  //      <Grid item xs={12} sm={6}>
  //        <TextField
  //          label="Password"
  //          name="password"
  //          required={true}
  //          type='password'
  //        />
  //      </Grid>
  //
  //      <Grid item xs={12} sm={6}>
  //        <TextField
  //          label="Repeat password"
  //          name="passwordRepeat"
  //          required={true}
  //          type='password'
  //        />
  //      </Grid>
  //
  //      <Grid item xs={12}>
  //        <FormGroup row>
  //          <LabelCheckbox
  //            onChange={(event, checked) => console.log(checked)}
  //            label="I would like to receive newsletter"
  //            value="newsletter"
  //          />
  //        </FormGroup>
  //      </Grid>
  //
  //      <Grid item xs={12}>
  //        <FormGroup row>
  //          <LabelCheckbox
  //            onChange={(event, checked) => console.log(checked)}
  //            label="I agree to Terms and Conditions, including Privacy Policy"
  //            value="agreement"
  //          />
  //        </FormGroup>
  //      </Grid>
  //
  //      <Grid item xs={12}>
  //        <Button raised primary>Complete registration</Button>
  //      </Grid>
  //    </Grid>
  //  )
  //}

  render() {
    const { error, introSubmitted } = this.props;
    return (
      <ContentBlock md>
        <Typography type="display1" gutterBottom>
          Registration
        </Typography>

        <Divider/>

        {!introSubmitted
          ? <RegistrationIntroForm onSubmit={this.onSubmit} submitError={error}/>
          : <div>step 2</div>
        }
      </ContentBlock>
    );
  }
}

const mapStateToProps = (state) => {
  const { registration } = state;
  return {
    isSubmitting: registration.isSubmitting,
    introSubmitted: registration.introSubmitted,
    error: registration.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostIntro: (id) => dispatch(postIntro(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
