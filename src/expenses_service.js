import ResourceService from './resource_service';

class ExpensesService extends ResourceService {
  constructor() {
    super('expenses');
  }
}

ExpensesService.instance = new ExpensesService();

export default ExpensesService;
