import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { blue, pink, red } from 'material-ui/styles/colors';

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: pink,
    error: red,
  }),
});

const MuiTheme = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    {children}
  </MuiThemeProvider>
);

MuiTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MuiTheme;