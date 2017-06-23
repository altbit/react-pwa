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
export const DEFAULT_ORDER = ORDER_DESC;

const styleSheet = createStyleSheet('SortableTable', theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
}));

class SortableTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    columnData: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {
    order: DEFAULT_ORDER,
    orderBy: 'id',
  };

  constructor(props) {
    super(props);
    const { order, orderBy, data } = props;
    this.state = {
      selected: [],
      order,
      orderBy,
      data,
    };
  }

  componentWillMount() {
    this.sortData(this.state.order, this.state.orderBy, this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.sortData(this.state.order, this.state.orderBy, nextProps.data);
    }
  }

  handleSelect(selected) {
    const { onSelect } = this.props;
    this.setState({ selected });
    if (onSelect) {
      onSelect(selected);
    }
  }

  sortData(order, orderBy, prevData) {
    const data = prevData.sort(
      (a, b) => (order === ORDER_DESC ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy])
    );

    this.setState({ data, order, orderBy });
  };

  handleRequestSort = (event, property) => {
    let order = DEFAULT_ORDER;

    if (this.state.orderBy === property && this.state.order === DEFAULT_ORDER) {
      order = DEFAULT_ORDER === ORDER_ASC ? ORDER_DESC : ORDER_ASC;
    }

    this.sortData(order, property, this.state.data);
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.handleSelect(this.state.data.map(n => n.id));
      return;
    }
    this.handleSelect([]);
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, columnData } = this.props;
    const { data, order, orderBy, selected } = this.state;

    return (
      <div className={classes.root}>
        <SortableTableToolbar numSelected={selected.length} />
        <Table>
          <SortableTableHead
            order={order}
            orderBy={orderBy}
            columnData={columnData}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {data.map(n => {
              const isSelected = this.isSelected(n.id);
              return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, n.id)}
                  onKeyDown={event => this.handleKeyDown(event, n.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={n.id}
                  selected={isSelected}
                >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell disablePadding>{n.name}</TableCell>
                  <TableCell numeric>{n.calories}</TableCell>
                  <TableCell numeric>{n.fat}</TableCell>
                  <TableCell numeric>{n.carbs}</TableCell>
                  <TableCell numeric>{n.protein}</TableCell>
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

export class TableData {
  numOfItems = 0;
  columns = [];
  data = [];

  addColumn(id, label, numeric = false, disablePadding = false) {
    this.columns.push({
      id,
      label,
      numeric,
      disablePadding,
    });
  }

  addData({ ...data }) {
    this.numOfItems++;
    this.data[this.numOfItems] = { id: this.numOfItems, ...data };
  }

  getColumns() {
    return this.columns;
  }

  getData() {
    return this.data;
  }
}
