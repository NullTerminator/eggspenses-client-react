import React from 'react';

import DateRangeWidget from './DateRangeWidget';
import StatWidget from './StatWidget';
import Chart from './Chart';
import DateRangeSelector from './DateRangeSelector';

import { GoogleChartService, LINE_CHART } from '../google_chart_service';

import ExpensesService from '../expenses_service';
import AssetEventsService from '../asset_events_service';

import ExpenseCalculator from '../expense_calculator';

import { chart_date_format } from '../util';

const CHART_ID = 'egg-chart-expenses';

class ExpensesWidget extends DateRangeWidget {
  constructor(props) {
    super(props);

    this.chart_svc = GoogleChartService;
  }

  make_request() {
    Promise.all([
      ExpensesService.all(this.date_params()),
      AssetEventsService.all(this.date_params())
    ])
      .then((responses) => {
        this.expenses = responses[0];
        this.asset_events = responses[1];
        this._draw_chart();
      });
  }

  _draw_chart() {
    if (this.expenses.length === 0) {
      return;
    }

    const options = {
      legend: { position: 'bottom' }
    };

    const calc = new ExpenseCalculator(this.expenses, this.asset_events);
    const daily = calc.calculate(this.start_date, this.end_date);

    const data = this.chart_svc.chart_data(
      daily,
      'amount',
      'Date',
      this.date_range_strings(),
      (e) => { return chart_date_format(e.date); },
      (e) => { return e.asset.name; }
    );

    this.chart_svc.draw(LINE_CHART, CHART_ID, data, options);
  }

  render() {
    return (
      <StatWidget stat_title="Expenses">
        <DateRangeSelector group_name="expenses" start_date_changed={ this.start_date_changed } end_date_changed={ this.end_date_changed }></DateRangeSelector>
        <Chart chart_id={ CHART_ID }></Chart>
      </StatWidget>
    );
  }
}

export default ExpensesWidget;
