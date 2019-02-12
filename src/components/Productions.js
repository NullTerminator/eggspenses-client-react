import React, { Component } from 'react';

import WidgetRow from './WidgetRow';
import ProductionsWidget from './ProductionsWidget';

class Productions extends Component {
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

export default ProductionsWidget;
