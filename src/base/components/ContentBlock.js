import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('ContentBlock', (theme) => ({
  root: {
    padding: '8px',
    [theme.breakpoints.up('sm')]: {
      padding: '16px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '24px',
    },
  },
}));

const ContentBlock = ({ children, classes }) => (
  <Paper className={classes.root}>
    {children}
  </Paper>
);

ContentBlock.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ContentBlock);
