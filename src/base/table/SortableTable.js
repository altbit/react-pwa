import { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';

import SortableTableHead from './SortableTableHead';
import SortableTableToolbar from './SortableTableToolbar';

export const ORDER_ASC = 'asc';
export const ORDER_DESC = 'desc';
export const DEFAULT_ORDER = ORDER_ASC;
const INDEX_NAME = 'rowIndex';

const styleSheet = createStyleSheet('SortableTable', theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  cell: {
    padding: 4,
    whiteSpace: 'normal',
  },
  checkbox: {
    width: 28,
    height: 28,
  },
}));

class SortableTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    pkName: PropTypes.string,
  };

  static defaultProps = {
    order: DEFAULT_ORDER,
    orderBy: INDEX_NAME,
  };

  state = {
    selected: [],
  };

  componentWillMount() {
    const { order, orderBy, data } = this.props;
    this.sortData(order, orderBy, this.prepareData(data));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      const { order, orderBy } = this.state;
      const newData = this.prepareData(nextProps.data);
      this.updateSelected(newData);
      this.sortData(order, orderBy, newData);
    }
  }

  prepareData(data) {
    let numOfItems = 1;
    return data.map(item => {
      return { rowIndex: numOfItems++, ...item };
    });
  }

  sortData(order, orderBy, newData) {
    const data = newData.sort(
      (a, b) => {
        let prevItem = (a[orderBy] && typeof a[orderBy] !== 'undefined') ? a[orderBy] : '';
        if (typeof prevItem === 'string') {
          prevItem = prevItem.toLowerCase();
        }

        let nextItem = (b[orderBy] && typeof b[orderBy] !== 'undefined') ? b[orderBy] : '';
        if (typeof nextItem === 'string') {
          nextItem = nextItem.toLowerCase();
        }

        return order === ORDER_DESC ? nextItem > prevItem : prevItem > nextItem;
      }
    );

    this.setState({ data, order, orderBy });
  };

  updateSelected(newData) {
    const { pkName } = this.props;
    const { selected } = this.state;

    if (!newData.length || !pkName || typeof newData[0][pkName] === 'undefined') {
      this.handleSelect([]);
      return;
    }

    const selectedByPk = this.getPksByIndexes(selected);
    const newSelected = newData.reduce((selected, item) => {
      if (selectedByPk.includes(item[pkName])) {
        selected.push(item[INDEX_NAME]);
      }
      return selected;
    }, []);

    this.handleSelect(newSelected);
  }

  handleSelect(selected) {
    const { onSelect } = this.props;

    this.setState({ selected });
    if (onSelect) {
      onSelect(this.getPksByIndexes(selected));
    }
  }

  getPksByIndexes(indexes) {
    const { pkName } = this.props;
    const { data } = this.state;

    return indexes.reduce((selected, itemIndex) => {
      const itemData = data.reduce((data, item) => {
        return item[INDEX_NAME] === itemIndex ? item : data;
      }, {});
      selected.push(itemData[pkName]);
      return selected;
    }, []);
  }

  handleRequestSort = (event, property) => {
    let order = DEFAULT_ORDER;

    if (this.state.orderBy === property && this.state.order === DEFAULT_ORDER) {
      order = DEFAULT_ORDER === ORDER_ASC ? ORDER_DESC : ORDER_ASC;
    }

    this.sortData(order, property, this.state.data);
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.handleSelect(this.state.data.map(n => n[INDEX_NAME]));
      return;
    }
    this.handleSelect([]);
  };

  handleKeyDown = (event, rowIndex) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, rowIndex);
    }
  };

  handleClick = (event, rowIndex) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(rowIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowIndex);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.handleSelect(newSelected);
  };

  isSelected = rowIndex => this.state.selected.includes(rowIndex);

  onEdit = () => {
    const { selected } = this.state;
    const { onEdit } = this.props;

    if (onEdit) {
      onEdit(this.getPksByIndexes(selected));
    }
  };

  onDelete = () => {
    const { selected } = this.state;
    const { onDelete } = this.props;

    if (onDelete) {
      onDelete(this.getPksByIndexes(selected));
    }
  };

  render() {
    const { classes, columns, name } = this.props;
    const { data, order, orderBy, selected } = this.state;

    return (
      <div className={classes.root}>
        <SortableTableToolbar
          numSelected={selected.length}
          name={name}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />
        <Table>
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            columns={columns}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {data.map(item => {
              const isSelected = this.isSelected(item[INDEX_NAME]);
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, item[INDEX_NAME])}
                  onKeyDown={event => this.handleKeyDown(event, item[INDEX_NAME])}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={item[INDEX_NAME]}
                  selected={isSelected}
                >
                  <TableCell checkbox className={classes.cell} key={`${item[INDEX_NAME]}-select`}>
                    <Checkbox checked={isSelected} className={classes.checkbox} />
                  </TableCell>
                  {columns.map(column => {
                    return (
                      <TableCell
                        disablePadding
                        numeric={column.numeric}
                        className={classes.cell}
                        key={`${item[INDEX_NAME]}-${column.id}`}
                      >{item[column.id]}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styleSheet)(SortableTable);