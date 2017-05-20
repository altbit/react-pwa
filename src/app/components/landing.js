import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const Landing = () => (
  <div>
    <Typography type="display2" gutterBottom>
      Welcome!
    </Typography>

    <Grid container gutter={24}>
      <Grid item>
        <Button raised component={Link} to="/register" primary>Register</Button>
      </Grid>
      <Grid item>
        <Button raised component={Link} to="/login" accent>Login</Button>
      </Grid>
    </Grid>
  </div>
);
export default Landing;