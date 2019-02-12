import React, { Component } from 'react';

import { days_ago, months_ago, years_ago, today, date_format, parse_api_date } from '../util';

const THIS_WEEK = '1wk';
const THIS_MONTH = '1mo';
const THREE_MONTHS = '3mo';
const SIX_MONTHS = '6mo';
const ONE_YEAR = '1yr';
const CUSTOM = 'Custom';

class DateRangeSelector extends Component {
  constructor(props) {
    super(props);

    this.options = [
      CUSTOM,
      ONE_YEAR,
      SIX_MONTHS,
      THREE_MONTHS,
      THIS_MONTH,
      THIS_WEEK,
    ];
    this.group_name = `date_option_${props.group_name}`;
    this.start_date_changed = props.start_date_changed;
    this.end_date_changed = props.end_date_changed;

    this.state = {
      selected_option: THIS_WEEK,
      custom: false
    };

    [
      this.range_selected,
      this.set_custom_start_date,
      this.set_custom_end_date,
      this.start_date_display_value,
      this.end_date_display_value
    ].forEach((f) => {
      f = f.bind(this);
    });
  }

  componentDidMount() {
    this.set_selected_option(THIS_WEEK);
  }

  range_selected(range) {
    this.set_selected_option(range);
  }

  set_selected_option(option) {
    this.set_end_date(today());
    this.setState({
      selected_option: option,
      custom: option === CUSTOM
    });

    switch(option) {
      case THIS_WEEK:
        this.set_start_date(days_ago(6));
        break;
      case THIS_MONTH:
        this.set_start_date(months_ago(1));
        break;
      case THREE_MONTHS:
        this.set_start_date(months_ago(3));
        break;
      case SIX_MONTHS:
        this.set_start_date(months_ago(6));
        break;
      case ONE_YEAR:
        this.set_start_date(years_ago(1));
        break;
      default:
        break;
    };
  }

  set_start_date(date) {
    if (this.state.start_date && date.getTime() === this.state.start_date.getTime()) {
      return;
    }

    this.setState({ start_date: date });
    this.start_date_changed(date);
  }

  set_end_date(date) {
    if (this.state.end_date && date.getTime() === this.state.end_date.getTime()) {
      return;
    }

    this.setState({ end_date: date });
    this.end_date_changed(date);
  }

  set_custom_start_date(date_str) {
    this.set_start_date(parse_api_date(date_str));
  }

  set_custom_end_date(date_str) {
    this.set_end_date(parse_api_date(date_str));
  }

  start_date_display_value() {
    return date_format(this.state.start_date);
  }

  end_date_display_value() {
    return date_format(this.state.end_date);
  }

  render() {
    const { selected_option, custom } = this.state;

    return (
      <div>
      { this.options.map((option) => {
        return (
          <label key={ option }>
            <input type="radio" name={ this.group_name } value={ option } checked={ selected_option === option } onClick={ (e) => this.range_selected(e.target.value) } readOnly />
            { option }
          </label>
        );
      })}
      { custom && (
        <div>
          <input type="text" defaultValue={ this.start_date_display_value() } onBlur={ (e) => this.set_custom_start_date(e.target.value) } />
          to
          <input type="text" defaultValue={ this.end_date_display_value() } onBlur={ (e) => this.set_custom_end_date(e.target.value) } />
        </div>
      )}
      </div>
    );
  }
}

export default DateRangeSelector;
