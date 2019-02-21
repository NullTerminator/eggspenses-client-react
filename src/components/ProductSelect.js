import React, { Component } from 'react';

import ProductsService from '../products_service';

import { by } from '../util';

class ProductSelect extends Component {
  constructor(props) {
    super(props);

    this.product_changed_cb = props.product_changed;

    this.state = {
      products: [],
      selected_product: null
    };

    ProductsService.all()
      .then((products) => {
        this.setState({ products: products });

        if (products.length > 0) {
          this.product_changed_cb(products[0]);
        }
      });
  }

  selected_product_changed = (e) => {
    const product_id = parseInt(e.target.value);
    const product = this.state.products.find(by('id', product_id));

    if (product !== this.state.selected_product) {
      this.setState({ selected_product: product });
      this.product_changed_cb(product);
    }
  }

  render() {
    const { products, selected_product } = this.state;

    return (
      <select value={ selected_product ? selected_product.id : '' } onChange={ this.selected_product_changed }>
        { products.map((prod) => {
          return (
            <option key={ prod.id } value={ prod.id }>{ prod.name }</option>
          );
        })}
      </select>
    );
  }
}

export default ProductSelect;
