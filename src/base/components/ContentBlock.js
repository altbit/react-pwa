import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('ContentBlock', (theme) => ({
  root: {
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.content.padding,
    [theme.breakpoints.up('sm')]: {
      padding: parseInt(theme.content.padding * 1.5),
    },
  },
  'width-md': {
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.getWidth('md'),
    },
  },
  'width-sm': {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.breakpoints.getWidth('sm'),
    },
  },
}));

const ContentBlock = ({ children, classes, md, sm }) => {
  const className = classNames(
    classes.root,
    {
      [classes['width-md']]: md,
      [classes['width-sm']]: sm,
    },
  );

  return (
    <Paper className={className}>
      {children}
    </Paper>
  );
};

ContentBlock.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  md: PropTypes.bool,
  sm: PropTypes.bool,
};

ContentBlock.defaultProps = {
  md: false,
  sm: false,
};

export default withStyles(styleSheet)(ContentBlock);
