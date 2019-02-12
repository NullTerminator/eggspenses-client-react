import { sum } from './util';

class ProfitCalculator {
  constructor(sale_items, productions, daily_expenses) {
    this.sale_items = sale_items;
    this.productions = productions;
    this.daily_expenses = daily_expenses;
  }

  calculate() {
    const vals = [];

    this.productions.forEach((production) => {
      this.sale_items.forEach((item) => {
        if (production.product === item.product) {
          const daily_expense = this._get_daily_expense_for(production.date, item.product.asset);
          const item_net = item.price - sum(item.expenses, `price`);
          const profit = (production.count / item.product_count) * item_net - daily_expense.amount;
          vals.push(new DailyProfit(profit, production.date, item));
        }
      });
    });

    return vals;
  }

  _get_daily_expense_for(date, asset) {
    return this.daily_expenses.find((e) => {
      return e.date.getTime() === date.getTime() && e.asset === asset;
    });
  }
}

class DailyProfit {
  constructor(amount, date, sale_item) {
    this.amount = amount;
    this.date = date;
    this.sale_item = sale_item;
  }
}

export default ProfitCalculator;
