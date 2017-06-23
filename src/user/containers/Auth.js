import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { getToken } from './../jwt';
import { getUser } from './../actions/signin';

class AuthContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onGetUser: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isAuthorised: PropTypes.bool.isRequired,
    userData: PropTypes.object,
    user: PropTypes.bool,
    guest: PropTypes.bool,
    redirect: PropTypes.any,
  };

  static defaultProps = {
    user: false,
    guest: false,
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
    const hasToken = token && token.length > 16;
    const { isAuthorised, userData } = this.props;

    return hasToken && !(isAuthorised && userData);
  }

  render() {
    const { children, isAuthorised, user: userRequired, guest: guestRequired } = this.props;

    if ((userRequired && !isAuthorised) || (guestRequired && isAuthorised)) {
      return this.renderFail();
    }

    return children.length
      ? <span>{children}</span>
      : children;
  }

  renderFail() {
    const { user: userRequired, redirect } = this.props;

    if (!redirect) {
      return null;
    }

    if (userRequired) {
      return <Redirect to={redirect !== true ? redirect : '/login'} />;
    }

    return <Redirect to={redirect !== true ? redirect : '/'} />;
  }
}

const mapStateToProps = (state) => {
  const { auth: { isSubmitting, isAuthorised, user: userData } } = state;
  return {
    isSubmitting,
    isAuthorised,
    userData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
