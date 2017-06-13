import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { CircularProgress } from 'material-ui/Progress';

import { getToken } from './../jwt';
import { getUser } from './../actions/signin';

class AuthorisationContainer extends Component {
  static propTypes = {
    children: PropTypes.any,
    onGetUser: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    authorised: PropTypes.bool.isRequired,
    user: PropTypes.object,
    error: PropTypes.object,
    required: PropTypes.bool,
    redirect: PropTypes.bool,
  };

  token = null;

  componentWillMount() {
    this.token = getToken();
    const hasToken = this.token && this.token.length;
    const { authorised, isSubmitting, user, required, redirect } = this.props;


  }

  render() {
    const { error, isSubmitting, required, redirect } = this.props;

    if (isSubmitting) {
      return <CircularProgress />;
    }

    if (required === true && redirect === true) {
      return <Redirect to='/login' />;
    }
  }
}

const mapStateToProps = (state) => {
  const { auth: {
    isSubmitting,
    authorised,
    user,
    error,
  }} = state;
  return {
    isSubmitting,
    authorised,
    user,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorisationContainer);
