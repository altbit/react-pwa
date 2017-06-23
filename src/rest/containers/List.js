import { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import ContentBlock from './../../base/components/ContentBlock';
import SortableTable, { TableData } from './../../base/table/SortableTable';

const tableData = new TableData();
tableData.addColumn('name', 'Dessert', false, true);
tableData.addColumn('calories', 'Calories', true, false);
tableData.addColumn('fat', 'Fat (g)', true, false);
tableData.addColumn('carbs', 'Carbs (g)', true, false);
tableData.addColumn('protein', 'Protein (g)', true, false);

tableData.addData({ name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 });
tableData.addData({ name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 });
tableData.addData({ name: 'Eclair', calories: 262, fat: 16.0, carbs: 26, protein: 6.0 });
tableData.addData({ name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 8.0 });
tableData.addData({ name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.8 });

const styleSheet = createStyleSheet('RestListTable', theme => ({
  root: {},
}));

class RestListTable extends Component {
  render() {
    return (
      <ContentBlock md>
        <SortableTable
          orderBy='calories'
          columnData={tableData.getColumns()}
          data={tableData.getData()}
        />
      </ContentBlock>
    );
  }
}

RestListTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(RestListTable);