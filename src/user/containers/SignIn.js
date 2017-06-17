import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignInForm from './../forms/SignIn';
import { postSignIn } from './../actions/signin';

class SignInContainer extends Component {
  static propTypes = {
    onPostSignIn: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  onSubmit = (values) => {
    const { onPostSignIn } = this.props;
    onPostSignIn(values);
  };

  render() {
    const { error, isSubmitting } = this.props;

    return <SignInForm
      onSubmit={this.onSubmit}
      submitError={error}
      isSubmitting={isSubmitting}
    />;
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
