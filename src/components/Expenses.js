import React, { Component } from 'react';

import WidgetRow from './WidgetRow';
import ExpensesWidget from './ExpensesWidget';

class Expenses extends Component {
  render() {
    return (
      <div className="container-fluid">
        <WidgetRow>
          <ExpensesWidget></ExpensesWidget>
        </WidgetRow>
      </div>
    );
  }
}

export default Expenses;
