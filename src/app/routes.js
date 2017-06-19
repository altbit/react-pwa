import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import bundle from './bundle';

import App from './components/App';

import LandingLoader from 'bundle-loader?lazy&name=[name]!./components/Landing';
import RegistrationLoader from 'bundle-loader?lazy&name=[name]!./../user/containers/Registration';
import SignInLoader from 'bundle-loader?lazy&name=[name]!./../user/containers/SignIn';
import SignOutLoader from 'bundle-loader?lazy&name=[name]!./../user/containers/SignOut';

const AppRoutes = () => (
  <Router>
    <App>
      <Route exact path='/' component={bundle(LandingLoader)} />
      <Route path='/register' component={bundle(RegistrationLoader)} />
      <Route path='/login' component={bundle(SignInLoader)} />
      <Route path='/logout' component={bundle(SignOutLoader)} />
    </App>
  </Router>
);
export default AppRoutes;