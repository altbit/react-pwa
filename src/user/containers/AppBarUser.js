import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { withRouter } from 'react-router'

import IconButton from 'material-ui/IconButton';
import TouchAppIcon from 'material-ui-icons/TouchApp';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import { green } from 'material-ui/styles/colors';

const styleSheet = createStyleSheet('LetterAvatar', {
  avatar: {
    color: '#fff',
    backgroundColor: green[400],
  },
});

class AppBarUserContainer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object,
    isSubmitting: PropTypes.bool.isRequired,
    isAuthorised: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {
    isSubmitting: false,
    isAuthorised: false,
  };

  render() {
    const { classes, location, isSubmitting, isAuthorised, user } = this.props;

    if (!isAuthorised) {
      return <IconButton
        color='contrast'
        component={Link}
        to={{
          pathname: '/login',
          state: { from: location },
        }}
        disabled={isSubmitting}
        title="Sign In"
      >
        <TouchAppIcon />
      </IconButton>;
    }

    return <Grid container align='center'>
      <Grid item>
        <Avatar className={classes.avatar}>{user.firstName[0] + user.lastName[0]}</Avatar>
      </Grid>
      <Grid item>
        <Typography type="body2" color='inherit'>
          {user.firstName} {user.lastName}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          color='contrast'
          component={Link}
          to="/logout"
          title="Sign Out"
        >
          <ExitToAppIcon />
        </IconButton>
      </Grid>
    </Grid>;
  }
}

const mapStateToProps = (state) => {
  const { auth: {
    isSubmitting,
    isAuthorised,
    user,
  }} = state;
  return {
    isSubmitting,
    isAuthorised,
    user,
  };
};

export default withStyles(styleSheet)(
  connect(mapStateToProps)(withRouter(AppBarUserContainer))
);
