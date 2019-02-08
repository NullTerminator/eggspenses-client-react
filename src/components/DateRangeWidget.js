import { Component } from 'react';

import {chart_date_format, date_range, date_format, today, days_ago} from '../util';


class DateRangeWidget extends Component {

  constructor() {
    super();
    this.init_dates();
  }

  init_dates() {
    this.start_date = days_ago(6);
    this.end_date = today();
  }

  date_params() {
    return {
      from_date: date_format(this.start_date),
      to_date: date_format(this.end_date)
    };
  }


  date_range() {
    return date_range(this.start_date, this.end_date);
  }

  date_range_strings() {
    let range = this.date_range();
    return range.map((d) => { return chart_date_format(d); });
  }

}

export default DateRangeWidget;
