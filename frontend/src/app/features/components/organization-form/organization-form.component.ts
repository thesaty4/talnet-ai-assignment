import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/form/button/button.component';
import { InputComponent } from '../../../shared/components/form/input/input.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-organization-form',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './organization-form.component.html',
  styleUrl: './organization-form.component.scss',
})
export class OrganizationFormComponent {
  @Output() organizationCreated = new EventEmitter<void>();
  orgForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.orgForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orgForm.valid) {
      this.apiService.createOrganization(this.orgForm.value.name).subscribe({
        next: () => {
          this.orgForm.reset();
          this.organizationCreated.emit();
        },
        error: (err) => console.error('Error creating organization:', err),
      });
    }
  }
}
