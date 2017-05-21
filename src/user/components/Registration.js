import { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import ContentBlock from './../../base/components/ContentBlock';
import { LabelCheckbox } from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';
import { Link } from 'react-router-dom';

export default class Registration extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    introValidated: false,
    password: null,
    passwordRepeat: null,
  };

  handleInput = (name) => (event) => {
    this.setState({ [name]: event.target.value});
  };

  handleGetStarted = () => {
    if (this.state.firstName && this.state.lastName && this.state.email) {
      this.setState({ introValidated: true });
    }
  };

  handleFinish = () => {
    console.log('Make request for registration: ', this.state);
  };

  renderIntro() {
    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            required={true}
            InputProps={{onChange: this.handleInput('firstName')}}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            required={true}
            InputProps={{onChange: this.handleInput('lastName')}}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="E-mail"
            name="email"
            required={true}
            InputProps={{onChange: this.handleInput('email')}}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          Already have an account? <Link to='/login'>Login</Link>
        </Grid>

        <Grid item xs={12}>
          <Button raised primary onClick={this.handleGetStarted}>Get started</Button>
        </Grid>
      </Grid>
    )
  }

  renderComplete() {
    return (
      <Grid container>
        <Grid item xs={12}>
          Hi {this.state.firstName} {this.state.lastName} ({this.state.email})
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="password"
            required={true}
            type='password'
            InputProps={{onChange: this.handleInput('password')}}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Repeat password"
            name="passwordRepeat"
            required={true}
            type='password'
            InputProps={{onChange: this.handleInput('passwordRepeat')}}
          />
        </Grid>

        <Grid item xs={12}>
          <FormGroup row>
            <LabelCheckbox
              onChange={(event, checked) => console.log(checked)}
              label="I would like to receive newsletter"
              value="newsletter"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup row>
            <LabelCheckbox
              onChange={(event, checked) => console.log(checked)}
              label="I agree to Terms and Conditions, including Privacy Policy"
              value="agreement"
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <Button raised primary onClick={this.handleFinish}>Complete registration</Button>
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <div>
        <Typography type="display1" gutterBottom>
          Registration
        </Typography>

        <ContentBlock>
          {
            !this.state.introValidated
            ? this.renderIntro()
            : this.renderComplete()
          }
        </ContentBlock>
      </div>
    );
  }
}