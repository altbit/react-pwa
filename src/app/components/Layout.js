import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import { white } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/MoreVert';

const styleSheet = createStyleSheet('Layout', (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'stretch',
  },
  content: {
    flex: '1 1 100%',
    alignItems: 'flex-start',
    display: 'flex',
    margin: '0 auto',
    maxWidth: '100%',
    padding: theme.content.padding,
    paddingTop: (56 + theme.content.padding),
    [theme.breakpoints.up('sm')]: {
      padding: parseInt(theme.content.padding * 1.5),
      paddingTop: (64 + parseInt(theme.content.padding * 1.5)),
    },
  },
  title: {
    textTransform: 'none',
    color: white,
    textDecoration: 'none',
  },
  menu: {
    marginLeft: 'auto',
  },
}));

const Layout = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Link to="/" className={classes.title}>
            <Typography type="title" color='inherit'>{AppConfig.appName}</Typography>
          </Link>
          <IconButton color='contrast' className={classes.menu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);