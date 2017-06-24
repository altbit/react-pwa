import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import { white } from 'material-ui/styles/colors';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import AppBarUser from './../../user/containers/AppBarUser';
import MenuDrawer from './MenuDrawer';

const styleSheet = createStyleSheet('AppBarContent', (theme) => ({
  title: {
    textTransform: 'none',
    color: white,
    textDecoration: 'none',
  },
  menu: {
    marginLeft: 'auto',
  },
}));

const AppBarContent = ({ classes }) => {
  return (
    <Grid container justify='space-between' align='center'>
      <Grid item>
        <Toolbar>
          <MenuDrawer />

          <Link to='/' className={classes.title}>
            <Typography type='title' color='inherit'>{AppConfig.appName}</Typography>
          </Link>
        </Toolbar>
      </Grid>

      <Grid item>
        <Toolbar className={classes.menu}>
          <AppBarUser />
        </Toolbar>
      </Grid>
    </Grid>
  );
};

AppBarContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppBarContent);