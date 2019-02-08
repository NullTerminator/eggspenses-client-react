import ResourceService from './resource_service';

class ProductionsService extends ResourceService {
  constructor() {
    super('productions');
  }
}

ProductionsService.instance = new ProductionsService();

export default ProductionsService;
