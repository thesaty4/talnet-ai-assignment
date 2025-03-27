import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Organization } from '../../types/organization';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [AccordionModule, CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss',
})
export class OrganizationListComponent {
  @Input() organizations: Organization[] = [];
}
