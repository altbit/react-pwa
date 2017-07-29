import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import bundle from './../bundle';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

import AppBarContentLoader from 'bundle-loader?lazy&name=[name]!./../../appbar/components/AppBarContent';
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
    padding: theme.content.gutter.nm,
    paddingTop: (56 + theme.content.gutter.nm),
    [theme.breakpoints.up('sm')]: {
      padding: theme.content.gutter.lg,
      paddingTop: (64 + theme.content.gutter.lg),
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Layout);