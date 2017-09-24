import { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import ContentBlock from './../../base/components/ContentBlock';
import SortableTable from './../../base/table/SortableTable';

const columns = [
  {id: 'name', label: 'Dessert', numeric: false},
  {id: 'calories', label: 'Calories', numeric: true},
  {id: 'fat', label: 'Fat (g)', numeric: true},
  {id: 'carbs', label: 'Carbs (g)', numeric: true},
  {id: 'protein', label: 'Protein (g)', numeric: true},
];
const data = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { name: 'Eclair', calories: 262, fat: 16.0, carbs: 26, protein: 6.0 },
  { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 8.0 },
  { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.8 },
];

const styleSheet = theme => ({
  root: {},
});

class RestListTable extends Component {
  render() {
    return (
      <ContentBlock md>
        <SortableTable
          name='Calories'
          orderBy='calories'
          columns={columns}
          data={data}
        />
      </ContentBlock>
    );
  }
}

RestListTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(RestListTable);