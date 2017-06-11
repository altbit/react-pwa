import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { LabelCheckbox } from 'material-ui/Checkbox';
import { FormGroup } from 'material-ui/Form';

import ContentBlock from './../../base/components/ContentBlock';

const Login = () => (
  <Grid container align='center' justify='center'>
    <Grid item>
      <ContentBlock sm>
        <Typography type="display1" gutterBottom>
          Authorisation
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="E-mail"
              name="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              name="password"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormGroup row>
              <LabelCheckbox
                onChange={(event, checked) => console.log(checked)}
                label="Remember me"
                value="rememberMe"
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6}>
            Don't have an account? <Link to='/register'>Register</Link>
          </Grid>

          <Grid item xs={12}>
            <Button raised primary>Log In</Button>
          </Grid>
        </Grid>
      </ContentBlock>
    </Grid>
  </Grid>
);
export default Login;