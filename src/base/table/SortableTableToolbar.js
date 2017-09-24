import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui-icons/Edit';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import Grid from 'material-ui/Grid';

const toolbarStyleSheet = theme => ({
  highlight: {
    color: theme.palette.primary[900],
    backgroundColor: theme.palette.primary[100],
  },
});

let SortableTableToolbar = props => {
  const { numSelected, classes, name, onDelete, onEdit } = props;

  return (
    <Toolbar
      className={classNames({
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Grid container justify='space-between'>
        <Grid item>
          <Typography type="title">{name}</Typography>
          {numSelected > 0
            ? <Typography type="subheading">{numSelected} selected</Typography>
            : null
          }
        </Grid>

        <Grid item>
          <Grid container justify='flex-end'>
            {numSelected === 1
              ? <Grid item>
                  <IconButton aria-label="Edit">
                    <EditIcon onClick={() => {
                      if (onEdit) {
                        onEdit();
                      }
                    }}/>
                  </IconButton>
                </Grid>
              : null
            }
            <Grid item>
              {numSelected > 0
                ? <IconButton aria-label="Delete">
                    <DeleteIcon onClick={() => {
                      if (onDelete) {
                        onDelete();
                      }
                    }}/>
                  </IconButton>
                : <IconButton aria-label="Filter list">
                    <FilterListIcon />
                  </IconButton>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

SortableTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default withStyles(toolbarStyleSheet)(SortableTableToolbar);
