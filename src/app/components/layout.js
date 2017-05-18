require('./../../assets/less/app.less');

import AppConfig from 'AppConfig';
import PropTypes from 'prop-types';
import {blueGrey900} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({
  palette: {
    textColor: blueGrey900,
  },
  appBar: {
    height: 60,
  },
});

const Layout = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className='layout-wrapper'>
        <AppBar title={AppConfig.appName} />
        {children}
      </div>
    </MuiThemeProvider>
  );
};
Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;