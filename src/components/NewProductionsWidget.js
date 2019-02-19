import React, { Component } from 'react';

import StatWidget from './StatWidget';

import ProductsService from '../products_service';
import ProductionsService from '../productions_service';

import { by, date_format, today } from '../util';

class NewProductionsWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_production: { count: 0 },
      products: [],
      selected_product: null,
      date: today()
    };

    ProductsService.all()
      .then((products) => {
        this.setState({ products: products });

        if (products.length > 0) {
          this._set_edit_production(products[0]);
        }

      });
  }

  save() {
    console.log('SAVE CALLED');
    return ProductionsService.save(this.state.edit_production)
      .then((prod) => {
        const { edit_production } = this.state;

        if (edit_production.date < today()) {
          this.increment_day();
        }

        Object.assign(edit_production, prod);
        this.setState({ edit_production: edit_production });
      });
  }

  delete() {
    if (window.confirm('Are you sure you want to delete this production?')) {
      return ProductionsService.delete(this.state.edit_production)
        .then(() => {
          const reset_prod = {};
          Object.assign(reset_prod, this.state.edit_production);
          reset_prod.id = null;
          reset_prod.count = 0;
          this.setState({ edit_production: reset_prod });
        });
    }
  }

  increment_day() {
    const { date, selected_product } = this.state;
    const new_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    this.setState({ date: new_date });
    this._set_edit_production(selected_product, new_date);
  }

  decrement_day() {
    const { date, selected_product } = this.state;
    const new_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    this.setState({ date: new_date });
    this._set_edit_production(selected_product, new_date);
  }

  count_changed(new_count) {
    const { edit_production } = this.state;
    edit_production.count = parseInt(new_count);
    this.setState({ edit_production: edit_production });
  }

  selected_product_changed(product_id) {
    const product = this.state.products.find(by('id', parseInt(product_id)));
    if (product !== this.state.selected_product) {
      this._set_edit_production(product);
    }
  }

  _set_edit_production(product, date=this.state.date) {
    if (!date) {
      return;
    }

    console.log(`SETTING EDIT FOR DATE: ${date}`);
    const params = {
      for_product_id: product.id,
      from_date: date_format(date),
      to_date: date_format(date)
    };

    //TODO:? store productions in here and find locally first?
    ProductionsService.all(params)
      .then((productions) => {
        const { edit_production } = this.state;

        if (productions.length > 0) {
          Object.assign(edit_production, productions[0]);
        } else {
          edit_production.id = null;
          edit_production.count = 0;
          edit_production.product = product;
          edit_production.date = date;
        }

        this.setState({
          edit_production: edit_production,
          selected_product: product
        });
      });
  }

  render() {
    const { edit_production, products, selected_product, date } = this.state;
    const new_or_update = edit_production.id ? 'Update' : 'New';
    const date_display_val = date_format(date);

    return (
      <StatWidget stat_title="Enter Productions">
        <h4>{ new_or_update } Production</h4>

        <form onSubmit={ (e) => { e.preventDefault(); this.save() } }>
          <select value={ selected_product ? selected_product.id : '' } onChange={ (e) => this.selected_product_changed(e.target.value) }>
            { products.map((prod) => {
              return (
                <option key={ prod.id } value={ prod.id }>{ prod.name }</option>
              );
            })}
          </select>

          <br />

          <label>
            Date:
            <input type="text" value={ date_display_val } onChange={ () => {} } />
          </label>
          <button onClick={ (e) => { e.preventDefault(); this.decrement_day() } }>- Day</button>
          <button onClick={ (e) => { e.preventDefault(); this.increment_day() } }>+ Day</button>

          <br />

          <label>
            Count:
            <input type="number" min="0" value={ edit_production.count } onChange={ (e) => this.count_changed(e.target.value) } />
          </label>

          <br />

          <button type="submit">Save</button>
          { edit_production.id && (
            <span>
              ---
              <button onClick={ (e) => { e.preventDefault(); this.delete() } }>X</button>
            </span>
          )}
        </form>
      </StatWidget>
    );
  }
}

export default NewProductionsWidget;
