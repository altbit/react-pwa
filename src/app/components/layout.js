require('./../../assets/less/app.less');

import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

const Layout = ({ children }) => {
  return (
    <MuiThemeProvider>
        <AppBar title={AppConfig.appName} />
        {children}
    </MuiThemeProvider>
  );
};
Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;