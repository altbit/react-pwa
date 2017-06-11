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
  typography: {
    fontSize: 14,
    fontWeightLight: 250,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    display4: {
      fontSize: 40,
      fontWeight: 400,
    },
    display3: {
      fontSize: 36,
      fontWeight: 300,
    },
    display2: {
      fontSize: 30,
      fontWeight: 300,
    },
    display1: {
      fontSize: 26,
      fontWeight: 300,
    },
    headline: {
      fontWeight: 300,
    },
    title: {
      fontSize: 18,
      fontWeight: 400,
    },
    subheading: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 400,
    },
    body1: {
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
    padding: 16,
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