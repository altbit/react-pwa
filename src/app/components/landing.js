import AppConfig from 'AppConfig';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>Welcome to {AppConfig.appName}</h1>
    <div>
      First time here? <Link to="/register">Register</Link> or <Link to="/login">Login</Link>
    </div>
  </div>
);
export default Landing;