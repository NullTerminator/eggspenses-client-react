import React, { Component } from 'react';

import ProductionsWidget from './ProductionsWidget';
import WidgetRow from './WidgetRow';

class Summary extends Component {
  render() {
    return (
      <div className="container-fluid">
        <WidgetRow>
          <ProductionsWidget/>
        </WidgetRow>
      </div>
    );
  }
}

export default Summary;
