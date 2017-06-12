import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RegistrationIntroForm from './../forms/RegistrationIntro';
import RegistrationCompleteForm from './../forms/RegistrationComplete';

import { postIntro } from './../actions/registration';

class RegistrationContainer extends Component {
  static propTypes = {
    onPostIntro: PropTypes.func.isRequired,
    onPostComplete: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    introSubmitted: PropTypes.bool.isRequired,
    error: PropTypes.object,
  };

  onSubmitIntro = (values) => {
    const { onPostIntro } = this.props;
    onPostIntro(values);
  };

  onSubmitComplete = (values) => {
    const { onPostComplete } = this.props;
    onPostComplete(values);
  };

  render() {
    const { error, introSubmitted } = this.props;
    return introSubmitted
      ? <RegistrationIntroForm onSubmit={this.onSubmitIntro} submitError={error}/>
      : <RegistrationCompleteForm onSubmit={this.onSubmitComplete} submitError={error}/>;
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
  onPostIntro: (values) => dispatch(postIntro(values)),
  onPostComplete: (values) => dispatch(postIntro(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
