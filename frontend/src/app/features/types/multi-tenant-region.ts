import { Organization } from './organization';
import { RegionalOffice } from './regional-office';

export interface MultiTenantRegionResponse {
  data: {
    organization: Organization;
    regions: RegionalOffice[];
  }[];
  pagination: PaginationType;
}

type PaginationType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
