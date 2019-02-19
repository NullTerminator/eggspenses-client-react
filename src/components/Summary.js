import React, { Component } from 'react';

import WidgetRow from './WidgetRow';

import ProductionsWidget from './ProductionsWidget';
import ProfitsWidget from './ProfitsWidget';
import NewProductionsWidget from './NewProductionsWidget';

class Summary extends Component {
  render() {
    return (
      <div className="container-fluid">
        <WidgetRow>
          <ProductionsWidget/>
          <ProfitsWidget/>
        </WidgetRow>
        <WidgetRow>
          <NewProductionsWidget></NewProductionsWidget>
        </WidgetRow>
      </div>
    );
  }
}

export default Summary;
