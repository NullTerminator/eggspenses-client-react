import ResourceService from './resource_service';

class ExpensesService extends ResourceService {
  constructor() {
    super('expenses');
  }
}

export default new ExpensesService();
