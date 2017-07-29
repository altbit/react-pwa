import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ReceiptIcon from 'material-ui-icons/Receipt';
import ListIcon from 'material-ui-icons/List';
import GroupIcon from 'material-ui-icons/Group';

const styleSheet = createStyleSheet('MenuDrawer', theme => ({
  list: {
    width: 250,
    flex: 'initial',
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

class MenuDrawer extends Component {
  state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({ open });
  };

  render() {
    const { classes } = this.props;

    const restItems = (
      <div>
        <ListItem component={Link} to='/rest/list' className={classes.item}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Table list Example" />
        </ListItem>
      </div>
    );

    const userItems = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </div>
    );

    const sideList = (
      <div>
        <List className={classes.list} disablePadding>
          {restItems}
        </List>
        <Divider />
        <List className={classes.list} disablePadding>
          {userItems}
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          color='contrast'
          title='App menu'
          onClick={this.toggleDrawer(true)}
          >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={this.state.open}
          onRequestClose={this.toggleDrawer(false)}
          onClick={this.toggleDrawer(false)}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

MenuDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MenuDrawer);