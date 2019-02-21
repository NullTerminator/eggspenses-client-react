import React, { Component } from 'react';

import StatWidget from './StatWidget';
import ProductSelect from './ProductSelect';

import ProductionsService from '../productions_service';

import { date_format, today } from '../util';

class NewProductionsWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit_production: {
        count: 0,
        date: today()
      },
      selected_product: null,
      date: date_format(today())
    };
  }

  save = (e) => {
    e.preventDefault();
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

  delete = (e) => {
    e.preventDefault();
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

  increment_day = (e) => {
    e.preventDefault();
    const { edit_production, selected_product } = this.state;
    const date = edit_production.date;
    const new_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    this._set_edit_production(selected_product, new_date);
  }

  decrement_day = (e) => {
    e.preventDefault();
    const { edit_production, selected_product } = this.state;
    const date = edit_production.date;
    const new_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    this._set_edit_production(selected_product, new_date);
  }

  date_changed = (e) => {
    this.setState({ date: e.target.value });
  }

  set_edit_date = (e) => {
    const val = e.target.value;
    if (!val || val === '') {
      return;
    }

    const new_date = this._parse_date(val);
    console.log(`SETTING DATE TO: ${new_date}`);
    this._set_edit_production(this.state.selected_product, new_date);
  }

  count_changed = (e) => {
    const new_count = parseInt(e.target.value);
    const { edit_production } = this.state;
    edit_production.count = new_count;
    this.setState({ edit_production: edit_production });
  }

  selected_product_changed = (product) => {
    console.log(`CHANGED IN NEW PRODUCT COMP: ${product.name}`);
    this._set_edit_production(product);
  }

  _parse_date(str_date) {
    const parts = str_date.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  _set_edit_production(product, date=this._parse_date(this.state.date)) {
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
          console.log('FOUND PRODUCTIONGS, USING FIRST');
          Object.assign(edit_production, productions[0]);
        } else {
          console.log('SETTING NEW EDIT PROD');
          edit_production.id = null;
          edit_production.count = 0;
          edit_production.product = product;
          edit_production.date = date;
        }

        this.setState({
          edit_production: edit_production,
          selected_product: product,
          date: date_format(edit_production.date)
        });
      });
  }

  render() {
    const { edit_production, selected_product, date } = this.state;
    const new_or_update = edit_production.id ? 'Update' : 'New';

    return (
      <StatWidget stat_title="Enter Productions">
        <h4>{ new_or_update } Production</h4>

        <form onSubmit={ this.save }>
          <ProductSelect product_changed={ this.selected_product_changed }></ProductSelect>

          <br />

          <label>
            Date:
            <input type="text" value={ date } onChange={ this.date_changed } onBlur={ this.set_edit_date } />
          </label>
          <button onClick={ this.decrement_day }>- Day</button>
          <button onClick={ this.increment_day }>+ Day</button>

          <br />

          <label>
            Count:
            <input type="number" min="0" value={ edit_production.count } onChange={ this.count_changed } />
          </label>

          <br />

          <button type="submit">Save</button>

          { edit_production.id && (
            <span>
              ---
              <button onClick={ this.delete }>X</button>
            </span>
          )}
        </form>
      </StatWidget>
    );
  }
}

export default NewProductionsWidget;
