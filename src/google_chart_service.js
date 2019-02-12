import { ensure_attr_func, unique } from './util';

export const LINE_CHART = 'LineChart';

export class GoogleChartService {
  constructor() {
    this._promise = new Promise((resolve) => {
      this._resolver = resolve;
    });

    window.google.charts.load('current', { packages: ['corechart'] });
    window.google.charts.setOnLoadCallback(this.load.bind(this));
  }

  load() {
    this._resolver();
  }

  loaded() {
    return this._promise;
  }

  draw(chart_type, elem_id, data, options) {
    this.loaded()
      .then(() => {
        data = window.google.visualization.arrayToDataTable(data);
        const chart = new window.google.visualization[chart_type](document.getElementById(elem_id));
        chart.draw(data, options);
      });
  }

  // Convert an array of objects into an array of data ready for charting
  //
  //  data:       array of objects
  //
  //  value_func: string of attr name or function to call with an object
  //              to get its value.  The result of either is used for the
  //              value in the chart
  //
  //  row_title:  string title of the first column
  //
  //  row_values: array of values for indexing into rows
  //
  //  row_func:   string of attr name or function to call with an object
  //              to get its value.  The result of either is used to determine
  //              which row the object will be placed in
  //
  //  col_title_func:  a function to call with an object that will return the
  //                   title of the column it belongs in
  chart_data(data, value_func, row_title, row_vals, row_func, col_title_func) {
    value_func = ensure_attr_func(value_func);
    row_func = ensure_attr_func(row_func);

    const results = [];
    // Populate titles
    const titles = [row_title].concat(data.map(col_title_func).filter(unique).sort());
    results.push(titles);

    //prepare with nulls
    row_vals.forEach((row_val) => {
      const nulls = new Array(titles.length - 1).fill(null);
      results.push([row_val].concat(nulls));
    });

    //populate from data
    data.forEach((d) => {
      const row_i = row_vals.indexOf(row_func(d)) + 1; // Add one to offset title row
      const col_i = titles.indexOf(col_title_func(d));
      results[row_i][col_i] = results[row_i][col_i] || 0;
      results[row_i][col_i] += value_func(d);
    });

    return results;
  }
}

GoogleChartService.instance = new GoogleChartService();
