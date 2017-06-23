import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

const toolbarStyleSheet = createStyleSheet('SortableTableToolbar', theme => ({
  root: {
    paddingRight: 2,
  },
  highlight: {
    color: theme.palette.primary[900],
    backgroundColor: theme.palette.primary[100],
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

let SortableTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      >
      <div className={classes.title}>
        <Typography type="title">Nutrition</Typography>
        {numSelected > 0
          ? <Typography type="subheading">{numSelected} selected</Typography>
          : null
        }
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0
          ? <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          : <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
        }
      </div>
    </Toolbar>
  );
};

SortableTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyleSheet)(SortableTableToolbar);
