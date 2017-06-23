import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import { green } from 'material-ui/styles/colors';

import Auth from './Auth';
import AppBarMenu from './../../app/containers/AppBarMenu';

const styleSheet = createStyleSheet('AppBarUserContainer', theme => ({
  avatar: {
    color: '#fff',
    backgroundColor: green[400],
  },
}));

class AppBarUserContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {
    isSubmitting: false,
  };

  render() {
    const { classes, isSubmitting, user } = this.props;

    const userWidget = (user && !isSubmitting)
        ? (
          <Grid container align='center'>
            <Grid item>
              <Avatar className={classes.avatar}>{user.firstName[0] + user.lastName[0]}</Avatar>
            </Grid>

            <Grid item>
              <Typography type='body2' color='inherit'>
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
          </Grid>
        )
        : null;

    return <Grid container align='center'>
      <Grid item>
        {userWidget}
      </Grid>

      <Grid item>
        <AppBarMenu />
      </Grid>
    </Grid>;
  }
}

const mapStateToProps = (state) => {
  const { auth: {
    isSubmitting,
    user,
  }} = state;
  return {
    isSubmitting,
    user,
  };
};

export default withStyles(styleSheet)(
  connect(mapStateToProps)(AppBarUserContainer)
);
