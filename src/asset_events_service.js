import ResourceService from './resource_service';

class AssetEventsService extends ResourceService {
  constructor() {
    super('asset_events');
  }
}

AssetEventsService.instance = new AssetEventsService();

export default AssetEventsService;
