import AppConfig from 'AppConfig';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const Landing = () => (
  <div>
    <h1>Welcome to {AppConfig.appName}</h1>
    <div>
      <Link to="/register"><
        FlatButton label="Register" primary={true}
      /></Link>
      <Link to="/login"><
        FlatButton label="Login" secondary={true}
      /></Link>
    </div>
  </div>
);
export default Landing;