import React from 'react';

import DateRangeWidget from './DateRangeWidget';
import StatWidget from './StatWidget';
import Chart from './Chart';
import DateRangeSelector from './DateRangeSelector';

import { GoogleChartService, LINE_CHART } from '../google_chart_service';
import ProductionsService from '../productions_service';
import { chart_date_format } from '../util';
import EventAggregator from '../event_aggregator';
import events from '../events';

const CHART_ID = 'egg-chart-productions';

class ProductionsWidget extends DateRangeWidget {
  constructor(props) {
    super(props);

    this.chart_svc = GoogleChartService;
    EventAggregator.subscribe(events.productions.CREATED, this._check_add_production);
    EventAggregator.subscribe(events.productions.UPDATED, this._check_add_production);
    EventAggregator.subscribe(events.productions.DELETED, this._check_remove_production);
  }

  make_request() {
    ProductionsService.all(this.date_params())
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

  _check_add_production = (production) => {
    if (this._is_in_range(production)) {
      if (this.productions.indexOf(production) === -1) {
        this.productions.push(production);
      }
      this._draw_chart();
    }
  }

  _check_remove_production = (production) => {
    let i = this.productions.indexOf(production);
    if (i !== -1) {
      this.productions.splice(i, 1);
      this._draw_chart();
    }
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
