import React from 'react';

import DateRangeWidget from './DateRangeWidget';
import StatWidget from './StatWidget';
import Chart from './Chart';
import DateRangeSelector from './DateRangeSelector';

import { GoogleChartService, LINE_CHART } from '../google_chart_service';
import ProductionsService from '../productions_service';
import { chart_date_format } from '../util';

const CHART_ID = 'egg-chart-productions';

class ProductionsWidget extends DateRangeWidget {
  constructor(props) {
    super(props);

    this.prod_svc = ProductionsService.instance;
    this.chart_svc = GoogleChartService.instance;
  }

  make_request() {
    this.prod_svc.all(this.date_params())
      .then((productions) => {
        this.productions = productions;
        this._draw_chart();
      });
  }

  _draw_chart() {
    if (this.productions.length === 0) {
      return;
    }

    const options = {
      legend: { position: 'bottom' }
    };

    const data = this.chart_svc.chart_data(
      this.productions,
      'count',
      'Date',
      this.date_range_strings(),
      (p) => { return chart_date_format(p.date); },
      (p) => { return p.product.name; }
    );

    this.chart_svc.draw(LINE_CHART, CHART_ID, data, options);
  }

  render() {
    return (
      <StatWidget stat_title="Recent Productions">
        <DateRangeSelector group_name="productions" start_date_changed={ this.start_date_changed } end_date_changed={ this.end_date_changed }></DateRangeSelector>
        <Chart chart_id={ CHART_ID }></Chart>
      </StatWidget>
    );
  }
}

export default ProductionsWidget;
