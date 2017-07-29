import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import { green } from 'material-ui/colors';

import Auth from './../../user/containers/Auth';
import AppBarMenu from './../components/AppBarMenu';

const styleSheet = createStyleSheet('AppBarUserContainer', theme => ({
  avatar: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    backgroundColor: green[400],
  },
  userName: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
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

            <Grid item className={classes.userName}>
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
