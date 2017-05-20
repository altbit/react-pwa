import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const Login = () => (
  <div>
    <Typography type="display2" gutterBottom>
      Authorisation
    </Typography>

    <Grid container direction='column'>
      <Grid item xs={12} sm={6}>
        <TextField
          label="E-mail"
          name="email"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="password"
          label="Password"
          name="password"
        />
      </Grid>
    </Grid>
  </div>
);
export default Login;