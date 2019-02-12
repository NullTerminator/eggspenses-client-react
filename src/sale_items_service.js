import ResourceService from './resource_service';

class SaleItemsService extends ResourceService {
  constructor() {
    super('sale_items');
  }
}

SaleItemsService.instance = new SaleItemsService();

export default SaleItemsService;
