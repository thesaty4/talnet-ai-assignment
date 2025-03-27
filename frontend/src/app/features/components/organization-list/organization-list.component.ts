import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MultiTenantRegionModel } from '../../../shared/models/multi-tenant-region.model';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss',
})
export class OrganizationListComponent {
  @Input() groupedList: MultiTenantRegionModel['groups']['data'] = [];
  @Input() pagination!: MultiTenantRegionModel['groups']['pagination'];

  @Output() loadMoreData = new EventEmitter<string>();
}
