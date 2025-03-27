import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { DropdownComponent } from '../../../shared/components/form/dropdown/dropdown.component';
import { InputComponent } from '../../../shared/components/form/input/input.component';
import { ApiService } from '../../services/api.service';
import { Organization } from '../../types/organization';

@Component({
  selector: 'app-regional-office-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './regional-office-form.component.html',
  styleUrl: './regional-office-form.component.scss',
})
export class RegionalOfficeFormComponent {
  @Input() organizations: Organization[] = [];
  @Output() officeCreated = new EventEmitter<void>();
  regionalForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.regionalForm = this.fb.group({
      organizationId: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.regionalForm.valid) {
      this.apiService.createRegionalOffice(this.regionalForm.value).subscribe({
        next: () => {
          this.regionalForm.reset();
          this.officeCreated.emit();
        },
        error: (err) => console.error('Error creating regional office:', err),
      });
    }
  }
}
