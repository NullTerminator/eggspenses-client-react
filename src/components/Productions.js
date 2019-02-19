import React, { Component } from 'react';

import WidgetRow from './WidgetRow';

import ProductionsWidget from './ProductionsWidget';
import NewProductionsWidget from './NewProductionsWidget';

class Productions extends Component {
  render() {
    return (
      <div className="container-fluid">
        <WidgetRow>
          <ProductionsWidget/>
          <NewProductionsWidget></NewProductionsWidget>
        </WidgetRow>
      </div>
    );
  }
}

export default Productions;
