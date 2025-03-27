import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { OrganizationFormComponent } from './features/components/organization-form/organization-form.component';
import { OrganizationListComponent } from './features/components/organization-list/organization-list.component';
import { RegionalOfficeFormComponent } from './features/components/regional-office-form/regional-office-form.component';
import { ApiService } from './features/services/api.service';
import { Organization } from './features/types/organization';
import { MultiTenantRegionModel } from './shared/models/multi-tenant-region.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    OrganizationFormComponent,
    RegionalOfficeFormComponent,
    OrganizationListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  organizations: Organization[] = [];
  groupedList: MultiTenantRegionModel['groups']['data'] = [];
  pagination!: MultiTenantRegionModel['groups']['pagination'];

  subscription$ = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.apiService.getOrganizations().subscribe({
      next: (orgs) => {
        this.organizations = orgs;
        this.loadRegionalOffices();
      },
      error: (err) => console.error('Error loading organizations:', err),
    });
  }

  private loadRegionalOffices() {
    this.subscription$.add(
      this.apiService.getMultiTenantRegions('?pagination=false').subscribe({
        next: (res) => {
          const model = new MultiTenantRegionModel(res);
          this.groupedList = model.groups['data'];
          this.organizations = model.records;
          this.pagination = model.groups['pagination'];
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
