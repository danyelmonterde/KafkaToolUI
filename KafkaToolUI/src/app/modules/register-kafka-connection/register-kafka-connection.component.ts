import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-kafka-connection',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register-kafka-connection.component.html',
  styleUrl: './register-kafka-connection.component.scss',
})
export class RegisterKafkaConnectionComponent {}
