import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() controlName: string = '';
  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() placeholder: string = 'Select an option';
  @Input() styleClass: string = '';
  @Input() errorMessage: string = 'This field is required';

  constructor(public controlContainer: ControlContainer) {}

  get control() {
    return this.controlContainer.control?.get(this.controlName);
  }

  get formGroup() {
    return this.controlContainer.control as FormGroup;
  }
}
