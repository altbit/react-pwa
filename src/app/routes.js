import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import bundle from './bundle';

import App from './components/App';
import LandingLoader from 'bundle-loader?lazy&name=[name]!./components/Landing';
import RegistrationLoader from 'bundle-loader?lazy&name=[name]!./../user/components/Registration';
import LoginLoader from 'bundle-loader?lazy&name=[name]!./../user/components/Login';

const AppRoutes = () => (
  <Router>
    <App>
      <Route exact path="/" component={bundle(LandingLoader)} />
      <Route path="/register" component={bundle(RegistrationLoader)} />
      <Route path="/login" component={bundle(LoginLoader)} />
    </App>
  </Router>
);
export default AppRoutes;