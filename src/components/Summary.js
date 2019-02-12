import React, { Component } from 'react';

import WidgetRow from './WidgetRow';
import ProductionsWidget from './ProductionsWidget';
import ProfitsWidget from './ProfitsWidget';

class Summary extends Component {
  render() {
    return (
      <div className="container-fluid">
        <WidgetRow>
          <ProductionsWidget/>
          <ProfitsWidget/>
        </WidgetRow>
      </div>
    );
  }
}

export default Summary;
