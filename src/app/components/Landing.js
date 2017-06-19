import AppConfig from 'AppConfig';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import Auth from './../../user/containers/Auth';
import ContentBlock from './../../base/components/ContentBlock';

const Landing = () => (
  <ContentBlock md>
    <Typography type='display1' gutterBottom>
      Welcome to {AppConfig.appName}
    </Typography>

    <Auth guest>
      <Typography type='body1'>
        Please <Link
          to={{
            pathname: '/login',
            state: { from: '/' },
          }}
        >Sign In</Link> or <Link to='/register'>Register</Link>
      </Typography>
    </Auth>

    <Auth user>
      <Typography type='body1'>
        You are successfully authorised to the system
      </Typography>
    </Auth>
  </ContentBlock>
);
export default Landing;