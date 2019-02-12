import ResourceService from './resource_service';

class ProductionsService extends ResourceService {
  constructor() {
    super('productions');
  }
}

export default new ProductionsService();
