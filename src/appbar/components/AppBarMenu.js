import AppConfig from 'AppConfig';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { withRouter } from 'react-router'

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/MoreVert';
import Grid from 'material-ui/Grid';
import Menu, { MenuItem } from 'material-ui/Menu';

import Auth from './../../user/containers/Auth';

const styleSheet = createStyleSheet('AppBarMenuContainer', theme => ({
  menu: {
    marginTop: 8,
    marginLeft: -52,
  },
  item: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:focus': {
      background: 'none',
    },
    '&:hover': {
      background: theme.palette.text.divider,
    },
  },
}));

class AppBarMenuComponent extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

  state = {
    anchorEl: undefined,
    open: false,
  };

  handleMenuClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleChooseItem = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, location } = this.props;

    const gitHubLinkItem = (
      <MenuItem
        onClick={this.handleChooseItem}
        component='a'
        href={AppConfig.GitHubLink}
        target='blank'
        className={classes.item}
      >View Source</MenuItem>
    );


    return <div>
      <IconButton
        color='contrast'
        title='User menu'
        aria-owns="user-menu"
        aria-haspopup="true"
        onClick={this.handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      <Auth guest>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleChooseItem}
          elevation={2}
          className={classes.menu}
        >
          <MenuItem
            onClick={this.handleChooseItem}
            component={Link}
            to={{
              pathname: '/login',
              state: { from: location },
            }}
            className={classes.item}
          >Sign In</MenuItem>

          <MenuItem
            onClick={this.handleChooseItem}
            component={Link}
            to='/register'
            className={classes.item}
          >Register</MenuItem>

          {gitHubLinkItem}
        </Menu>
      </Auth>

      <Auth user>
        <Menu
          id="user-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleChooseItem}
          elevation={2}
          className={classes.menu}
          >

          <MenuItem
            onClick={this.handleChooseItem}
            component={Link}
            to='/logout'
            className={classes.item}
          >Sign Out</MenuItem>

          {gitHubLinkItem}
        </Menu>
      </Auth>
    </div>;
  }
}

export default withStyles(styleSheet)(AppBarMenuComponent);
