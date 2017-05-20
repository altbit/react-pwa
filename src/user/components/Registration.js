import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

const Registration = () => (
  <div>
    <Typography type="display1" gutterBottom>
      Registration
    </Typography>

    <Grid container>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          name="first-name"
          InputProps={{onChange: (event) => console.log(event.target.value)}}
          />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          name="last-name"
          />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="E-mail"
          name="email"
          />
      </Grid>

      <Grid item xs={12}>
        <Button raised primary onClick={(event) => console.log('clicked')}>Next</Button>
      </Grid>
    </Grid>
  </div>
);

export default Registration;