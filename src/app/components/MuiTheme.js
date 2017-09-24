import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, pink, red } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: pink,
    error: red,
  },
  typography: {
    fontSize: 14,
    fontWeightLight: 250,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    display4: {
      fontSize: 50,
      fontWeight: 300,
    },
    display3: {
      fontSize: 40,
      fontWeight: 300,
    },
    display2: {
      fontSize: 32,
      fontWeight: 300,
    },
    display1: {
      fontSize: 28,
      fontWeight: 300,
    },
    headline: {
      fontSize: 22,
      fontWeight: 300,
    },
    title: {
      fontSize: 18,
      fontWeight: 400,
    },
    subheading: {
      fontSize: 14,
      fontWeight: 300,
    },
    body2: {
      fontSize: 16,
      fontWeight: 400,
    },
    body1: {
      fontSize: 15,
      fontWeight: 300,
    },
    caption: {
      fontWeight: 300,
    },
    button: {
      fontWeight: 400,
      fontSize: 14,
    },
  },
  // Our own variables
  content: {
    gutter: {
      xs: 4,
      sm: 8,
      nm: 16,
      lg: 24,
      xl: 40,
    },
  },
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