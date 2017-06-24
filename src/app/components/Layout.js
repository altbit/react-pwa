import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import bundle from './../bundle';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import AppBarContentLoader from 'bundle-loader?lazy&name=[name]!./AppBarContent';
const AppBarContent = bundle(AppBarContentLoader);

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
  appBar: {
    minHeight: 56,
    [theme.breakpoints.up('sm')]: {
      minHeight: 64,
    },
  },
}));

const Layout = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <AppBarContent />
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