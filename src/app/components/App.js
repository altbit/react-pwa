require('./../../assets/less/app.less');

import PropTypes from 'prop-types';
import MuiTheme from './MuiTheme';
import Layout from './Layout';

const App = ({ children }) => (
  <MuiTheme>
    <Layout>
      {children}
    </Layout>
  </MuiTheme>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;