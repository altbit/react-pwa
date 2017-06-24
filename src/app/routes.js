import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import bundle from './bundle';

import App from './components/App';

import Landing from './components/Landing';
import RegistrationLoader from 'bundle-loader?lazy&name=[name]!./../user/containers/Registration';
import SignInLoader from 'bundle-loader?lazy&name=[name]!./../user/containers/SignIn';
import SignOutLoader from 'bundle-loader?lazy&name=[name]!./../user/containers/SignOut';

import RestListLoader from 'bundle-loader?lazy&name=[name]!./../rest/containers/List';

const AppRoutes = () => (
  <Router>
    <App>
      <Route exact path='/' component={Landing} />
      <Route path='/register' component={bundle(RegistrationLoader)} />
      <Route path='/login' component={bundle(SignInLoader)} />
      <Route path='/logout' component={bundle(SignOutLoader)} />

      <Route path='/rest/list' component={bundle(RestListLoader)} />
    </App>
  </Router>
);
export default AppRoutes;