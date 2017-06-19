import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import SignInForm from './../forms/SignIn';
import { postSignIn } from './../actions/signin';
import Auth from './../../user/containers/Auth';
import Grid from 'material-ui/Grid';

class SignInContainer extends Component {
  static propTypes = {
    location: PropTypes.object,
    onPostSignIn: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  onSubmit = (values) => {
    const { onPostSignIn } = this.props;
    onPostSignIn(values);
  };

  render() {
    const { location, error, isSubmitting } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };

    return <Grid container align='center' justify='center'>
      <Grid item xs>
        <Auth guest redirect={from}>
          <SignInForm
            onSubmit={this.onSubmit}
            submitError={error}
            isSubmitting={isSubmitting}
          />
        </Auth>
      </Grid>
    </Grid>;
  }
}

const mapStateToProps = (state) => {
  const { auth: {
    isSubmitting,
    error,
  }} = state;
  return {
    isSubmitting,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostSignIn: (values) => dispatch(postSignIn(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
