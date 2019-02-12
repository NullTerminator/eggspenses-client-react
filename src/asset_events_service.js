import ResourceService from './resource_service';

class AssetEventsService extends ResourceService {
  constructor() {
    super('asset_events');
  }
}

export default new AssetEventsService();
