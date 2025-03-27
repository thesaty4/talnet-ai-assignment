import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { Input, forwardRef } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, InputTextModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() controlName: string = '';
  @Input() placeholder: string = '';
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
