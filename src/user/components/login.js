import TextField from 'material-ui/TextField';

const Login = () => (
  <div>
    <h1>Authorisation</h1>
    <div>
      <TextField
        name="email"
        hintText="Enter your email address"
        floatingLabelText="E-mail"
      /><br />
      <TextField
        name="password"
        hintText="Enter your password"
        floatingLabelText="Password"
        type="password"
      />
    </div>
  </div>
);
export default Login;