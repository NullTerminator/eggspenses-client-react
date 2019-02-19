import ResourceService from './resource_service';

class ProductsService extends ResourceService {
  constructor() {
    super('products');
  }
}

export default new ProductsService();
