import { Component } from 'react';

import { chart_date_format, date_range, date_format } from '../util';


class DateRangeWidget extends Component {

  constructor(props) {
    super(props);

    this.start_date_changed = this.start_date_changed.bind(this);
    this.end_date_changed = this.end_date_changed.bind(this);
  }

  date_params() {
    return {
      from_date: date_format(this.start_date),
      to_date: date_format(this.end_date)
    };
  }

  date_range_strings() {
    const range = date_range(this.start_date, this.end_date);
    return range.map((d) => { return chart_date_format(d); });
  }

  start_date_changed(date) {
    this.start_date = date;
    this._safe_make_request();
  }

  end_date_changed(date) {
    this.end_date = date;
    this._safe_make_request();
  }

  _safe_make_request() {
    if (this.start_date && this.end_date) {
      this.make_request();
    }
  }


  _is_in_range(resource) {
    return this.start_date <= resource.date && this.end_date >= resource.date;
  }

}

export default DateRangeWidget;
