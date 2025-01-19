import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() formGroup!: FormGroup;
  @Input() inputs!: any[]; // Array of form fields and their properties
  @Input() toggleValue = false; // Receive value from parent
  @Input() labelPosition: 'before' | 'after' = 'after'; // Optional customizations
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  @Output() valueChange = new EventEmitter<boolean>(); // Emit changes to parent

  onToggleChange(newValue: boolean) {
    this.toggleValue = newValue; // Update the child’s toggleValue
    this.valueChange.emit(newValue); // Notify parent
  }

  trackByFn(index: number, item: any): number {
    return index; // Track by index to optimize rendering
  }
}
