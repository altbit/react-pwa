import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Layout from './components/layout';
import Landing from './components/landing';
import Registration from './../user/components/registration';
import Login from './../user/components/login';

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