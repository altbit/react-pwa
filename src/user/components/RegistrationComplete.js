import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import TouchAppIcon from 'material-ui-icons/TouchApp';
import Icon from 'material-ui/Icon';

import ContentBlock from './../../base/components/ContentBlock';

const styleSheet = createStyleSheet('RegistrationComplete', (theme) => ({
  footer: {
    paddingTop: 16,
  },
  bigIcon: {
    fontSize: 100,
    color: theme.palette.primary[500],
  },
  content: {
    textAlign: 'center',
    marginBottom: 24,
  },
  icon: {
    marginLeft: 8,
  },
}));

const RegistrationComplete = (props) => {
  const { userData, classes } = props;

  return <ContentBlock sm>
    <Typography type="display1" gutterBottom>
      Complete registration
    </Typography>

    <Divider/>

    <Grid container direction='column' justify='center' align='center'>
      <Grid item>
        <Icon className={classes.bigIcon}>check</Icon>
      </Grid>

      <Grid item className={classes.content}>
        <Typography type="body2" gutterBottom>
          Welcome, {userData.firstName}!
        </Typography>
        <Typography type="body1">
          Thank you for trying<br />
          {AppConfig.appName}
        </Typography>
      </Grid>
    </Grid>

    <Divider/>

    <Grid container justify='center' className={classes.footer}>
      <Grid item>
        <Button raised primary component={Link} to='/login'>
          Log in  <TouchAppIcon  className={classes.icon}/>
        </Button>
      </Grid>
    </Grid>
  </ContentBlock>;
};

RegistrationComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  userData: PropTypes.object,
};

export default withStyles(styleSheet)(RegistrationComplete);
