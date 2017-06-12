import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styleSheet = createStyleSheet('ContentBlock', (theme) => {
  let styles = {
    root: {
      flex: '1 1 100%',
        maxWidth: '100%',
        margin: '0 auto',
        padding: theme.content.padding,
        [theme.breakpoints.up('sm')]: {
          padding: parseInt(theme.content.padding * 1.5),
        },
    },
  };

  styles = theme.breakpoints.keys.reduce((styles, breakpoint) => {
    styles[`width-${breakpoint}`] = {
      [theme.breakpoints.up(breakpoint)]: {
        maxWidth: theme.breakpoints.getWidth(breakpoint),
      },
    };
    return styles;
  }, styles);

  return styles;
});

const ContentBlock = ({ children, classes, xs, sm, md, lg, xl }) => {
  const className = classNames(
    classes.root,
    {
      [classes['width-xs']]: xs,
      [classes['width-sm']]: sm,
      [classes['width-md']]: md,
      [classes['width-lg']]: lg,
      [classes['width-xl']]: xl,
    }
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
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
};

ContentBlock.defaultProps = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

export default withStyles(styleSheet)(ContentBlock);
