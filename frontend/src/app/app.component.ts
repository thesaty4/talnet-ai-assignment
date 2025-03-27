import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { OrganizationFormComponent } from './features/components/organization-form/organization-form.component';
import { OrganizationListComponent } from './features/components/organization-list/organization-list.component';
import { RegionalOfficeFormComponent } from './features/components/regional-office-form/regional-office-form.component';
import { ApiService } from './features/services/api.service';
import { Organization } from './features/types/organization';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    OrganizationFormComponent,
    RegionalOfficeFormComponent,
    OrganizationListComponent,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  organizations: Organization[] = [];

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
    this.organizations.forEach((org) => {
      this.apiService.getRegionalOffices(org.id).subscribe({
        next: (offices) => (org.regionalOffices = offices),
        error: (err) =>
          console.error(`Error loading offices for ${org.name}:`, err),
      });
    });
  }
}
