import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RegistrationIntroForm from './../forms/RegistrationIntro';
import RegistrationCompleteForm from './../forms/RegistrationComplete';
import RegistrationComplete from './../components/RegistrationComplete';
import { postIntro, postComplete } from './../actions/registration';
import Auth from './Auth';

class RegistrationContainer extends Component {
  static propTypes = {
    onPostIntro: PropTypes.func.isRequired,
    onPostComplete: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    introSubmitted: PropTypes.bool.isRequired,
    completeSubmitted: PropTypes.bool.isRequired,
    userData: PropTypes.object,
    error: PropTypes.object,
  };

  onSubmitIntro = (values) => {
    const { onPostIntro } = this.props;
    onPostIntro(values);
  };

  onSubmitComplete = (values) => {
    const { onPostComplete, userData: { tempPassword, email } } = this.props;
    onPostComplete(values, { tempPassword, email });
  };

  render() {
    const { error, introSubmitted, completeSubmitted, userData } = this.props;

    if (completeSubmitted) {
      return <RegistrationComplete userData={userData} />;
    }

    if (introSubmitted) {
      return (
        <RegistrationCompleteForm
          onSubmit={this.onSubmitComplete}
          userData={userData}
          submitError={error}
        />
      );
    }

    return (
      <Auth guest redirect='/'>
        <RegistrationIntroForm
          onSubmit={this.onSubmitIntro}
          submitError={error}
        />
      </Auth>
    );
  }
}

const mapStateToProps = (state) => {
  const { registration: {
    isSubmitting,
    introSubmitted,
    completeSubmitted,
    userData,
    error,
  }} = state;
  return {
    isSubmitting,
    introSubmitted,
    completeSubmitted,
    userData,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPostIntro: (values) => dispatch(postIntro(values)),
  onPostComplete: (values, userData) => dispatch(postComplete(values, userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
