import ResourceService from './resource_service';

class SaleItemsService extends ResourceService {
  constructor() {
    super('sale_items');
  }
}

export default new SaleItemsService();
