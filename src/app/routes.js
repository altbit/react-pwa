import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Bundle from './bundle';

import Layout from './components/layout';
import Landing from './components/landing';
import RegistrationLoader from 'bundle-loader?lazy&name=[name]!./../user/components/registration';
import LoginLoader from 'bundle-loader?lazy&name=[name]!./../user/components/login';

const Registration = (props) => (
  <Bundle loader={RegistrationLoader}>
    {(Registration) => <Registration {...props}/>}
  </Bundle>
);
const Login = (props) => (
  <Bundle loader={LoginLoader}>
    {(Login) => <Login {...props}/>}
  </Bundle>
);

const AppRoutes = () => (
  <Router>
    <Layout>
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Registration} />
      <Route path="/login" component={Login} />
    </Layout>
  </Router>
);
export default AppRoutes;