import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseAPIService } from '../../shared/services/base-api.service';
import { Organization } from '../types/organization';
import { RegionalOffice } from '../types/regional-office';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseAPIService {
  // Fetch all organizations
  getOrganizations(): Observable<Organization[]> {
    return this.get<Organization[]>('/organizations');
  }

  // Create an organization
  createOrganization(name: string): Observable<Organization> {
    return this.post<Organization>('/organizations', { name });
  }

  // Fetch regional offices for a specific organization
  getRegionalOffices(organizationId: string): Observable<RegionalOffice[]> {
    return this.get<RegionalOffice[]>(`/regional-offices/${organizationId}`);
  }

  // Create a new regional office
  createRegionalOffice(
    office: Partial<RegionalOffice>
  ): Observable<RegionalOffice> {
    return this.post<RegionalOffice>('/regional-offices', office);
  }
}
