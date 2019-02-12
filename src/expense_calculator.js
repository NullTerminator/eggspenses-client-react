import { by, date_range, group_by, sort_by, sum } from './util';

class ExpenseCalculator {
  constructor(expenses, asset_events) {
    this.expenses = expenses;
    this.asset_events = asset_events;
  }

  calculate(from, to) {
    const vals = [];

    const range = date_range(from, to);
    const grouped_events = group_by(this.asset_events, 'asset');

    grouped_events.forEach((group) => {
      range.forEach((date) => {
        const asset = group[0].asset;
        const count = this._get_event_count(asset, date);
        if (isFinite(count)) {
          const total_expense = this._get_expense_for_day(asset, date);
          vals.push(new DailyExpense(count * total_expense, date, asset));
        }
      });
    });

    return vals;
  }

  // Return count for that asset and day, 0 if before any events
  // return null if no events for asset
  _get_event_count(asset, date) {
    const events = sort_by(this.asset_events.filter(by('asset', asset)), 'date').reverse();
    if (events.length === 0) {
      return null;
    }
    const event = events.find((e) => {
      return e.date <= date;
    });

    return event ? event.count : 0;
  }

  _get_expense_for_day(asset, date) {
    const expenses = this.expenses.filter((e) => {
      var good = e.expensable === asset;
      if (good && e.start_date) {
        good = date >= e.start_date;
      }
      if (good && e.end_date) {
        good = date <= e.end_date;
      }
      return good;
    });

    return sum(expenses, 'price');
  }
}

class DailyExpense {
  constructor(amount, date, asset) {
    this.amount = amount;
    this.date = date;
    this.asset = asset;
  }
}

export default ExpenseCalculator;
