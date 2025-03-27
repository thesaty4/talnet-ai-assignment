import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = 'Submit';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() styleClass: string = 'p-button-raised';

  @Output() onClick = new EventEmitter();
}
