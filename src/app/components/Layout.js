import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styleSheet = createStyleSheet('Layout', (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'stretch',
  },
  content: {
    flex: '1 1 100%',
    margin: '0 auto',
    maxWidth: '100%',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '80px',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.getWidth('md') + 'px',
    },
  },
  title: {
    textTransform: 'none',
  },
}));

const Layout = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton contrast>
            <MenuIcon />
          </IconButton>
          <Button contrast component={Link} to="/" className={classes.title}>
            <Typography type="title" colorInherit>{AppConfig.appName}</Typography>
          </Button>
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