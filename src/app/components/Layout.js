import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AppConfig from 'AppConfig';

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
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.getWidth('md') + 'px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '24px',
      paddingRight: '24px',
    },
  },
}));

const Layout = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography type="title" colorInherit>{AppConfig.appName}</Typography>
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