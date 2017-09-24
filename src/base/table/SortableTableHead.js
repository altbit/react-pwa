import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const styleSheet = theme => ({
  cell: {
    padding: 3,
    whiteSpace: 'normal',
  },
  checkbox: {
    width: 28,
    height: 28,
  },
});

class SortableTableHead extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
  };

  createSortHandler = property => event => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const { classes, onSelectAllClick, order, orderBy, columns } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell checkbox disablePadding className={classes.cell}>
            <Checkbox onChange={onSelectAllClick} className={classes.checkbox} />
          </TableCell>
          {columns.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding
                className={classes.cell}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styleSheet)(SortableTableHead);
