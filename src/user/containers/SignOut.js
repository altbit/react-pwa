import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { signOut } from './../actions/signin';
import Auth from './../../user/containers/Auth';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class SignOutContainer extends Component {
  static propTypes = {
    onSignOut: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { onSignOut } = this.props;
    onSignOut();
  }

  render() {
    return <Grid container align='center' justify='center'>
      <Grid item xs>
        <Auth user redirect='/'>
          <Typography type='body2'>
            Signing out...
          </Typography>
        </Auth>
      </Grid>
    </Grid>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOutContainer);
