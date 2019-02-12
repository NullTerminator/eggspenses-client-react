import React from 'react';

import DateRangeWidget from './DateRangeWidget';
import StatWidget from './StatWidget';
import Chart from './Chart';
import DateRangeSelector from './DateRangeSelector';

import { GoogleChartService, LINE_CHART } from '../google_chart_service';

import ProductionsService from '../productions_service';
import ExpensesService from '../expenses_service';
import AssetEventsService from '../asset_events_service';
import SaleItemsService from '../sale_items_service';

import ExpenseCalculator from '../expense_calculator';
import ProfitCalculator from '../profit_calculator';

import { chart_date_format, sum } from '../util';

const CHART_ID = 'egg-chart-profits';

class ProfitsWidget extends DateRangeWidget {
  constructor(props) {
    super(props);

    this.chart_svc = GoogleChartService;

    this.state = {};
  }

  make_request() {
    Promise.all([
      ExpensesService.all(this.date_params()),
      AssetEventsService.all(this.date_params()),
      ProductionsService.all(this.date_params()),
      SaleItemsService.all()
    ])
      .then((responses) => {
        this.expenses = responses[0];
        this.asset_events = responses[1];
        this.productions = responses[2];
        this.sale_items = responses[3];
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

    const expenses_calc = new ExpenseCalculator(this.expenses, this.asset_events);
    const daily_expenses = expenses_calc.calculate(this.start_date, this.end_date);

    const profits_calc = new ProfitCalculator(this.sale_items, this.productions, daily_expenses);
    const daily_profits = profits_calc.calculate(this.start_date, this.end_date);
    this.setState({ total_profit: sum(daily_profits, `amount`) });

    const data = this.chart_svc.chart_data(
      daily_profits,
      'amount',
      'Date',
      this.date_range_strings(),
      (p) => { return chart_date_format(p.date); },
      (p) => { return p.sale_item.name; }
    );

    this.chart_svc.draw(LINE_CHART, CHART_ID, data, options);
  }

  render() {
    const { total_profit } = this.state;
    const total_profit_display = Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD'
    }).format(total_profit || 0);

    return (
      <StatWidget stat_title="Profits">
        <DateRangeSelector group_name="profits" start_date_changed={ this.start_date_changed } end_date_changed={ this.end_date_changed }></DateRangeSelector>
        <Chart chart_id={ CHART_ID }></Chart>

        <br />

        <div className={ total_profit > 0 ? 'alert alert-success' : 'alert alert-danger' }>
          <strong>Total:</strong> { total_profit_display }
        </div>
      </StatWidget>
    );
  }
}

export default ProfitsWidget;
