import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { CircularProgress } from 'material-ui/Progress';

import { getToken } from './../jwt';
import { getUser } from './../actions/signin';

class AuthContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    onGetUser: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isAuthorised: PropTypes.bool.isRequired,
    userData: PropTypes.object,
    error: PropTypes.object,
    user: PropTypes.bool,
    guest: PropTypes.bool,
    redirect: PropTypes.bool,
    loader: PropTypes.bool,
  };

  static defaultProps = {
    user: false,
    guest: false,
    redirect: false,
    loader: false,
  };

  componentWillMount() {
    this.init();
  }

  init () {
    const { isSubmitting, onGetUser } = this.props;

    if (isSubmitting) {
      return;
    }

    if (this.awaitingUserData()) {
      onGetUser();
    }
  }

  awaitingUserData() {
    const token = getToken();
    console.log(token);
    const hasToken = token && token.length > 10;
    const { isAuthorised, userData } = this.props;

    return hasToken && !(isAuthorised && userData);
  }

  render() {
    const { error, isSubmitting, isAuthorised, loader,
      user: userRequired, guest: guestRequired } = this.props;

    if (error) {
      console.error(error);
      // todo: Modal error
      return <div>
        Authorisation error
      </div>;
    }

    if (isSubmitting || this.awaitingUserData()) {
      if (loader) {
        return <CircularProgress />;
      } else {
        return null;
      }
    }

    if ((userRequired && !isAuthorised) || (guestRequired && isAuthorised)) {
      return this.renderFail();
    }

    return this.props.children;
  }

  renderFail() {
    const { user: userRequired, redirect } = this.props;

    if (!redirect) {
      return null;
    }

    if (userRequired) {
      return <Redirect to='/login' />;
    }

    return <Redirect to='/'/>;
  }
}

const mapStateToProps = (state) => {
  const { auth: {
    isSubmitting,
    isAuthorised,
    user: userData,
    error,
  }} = state;
  return {
    isSubmitting,
    isAuthorised,
    userData,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
