import { MultiTenantRegionResponse } from '../../features/types/multi-tenant-region';
import { Organization } from '../../features/types/organization';

export class MultiTenantRegionModel {
  records: Organization[];
  groups: MultiTenantRegionResponse;

  constructor(input: MultiTenantRegionResponse) {
    this.groups = input;
    this.records = input.data.map((group) => group.organization);
  }
}
