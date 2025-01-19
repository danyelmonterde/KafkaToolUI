import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';

@Component({
  selector: 'app-register-kafka-connection',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './register-kafka-connection.component.html',
  styleUrl: './register-kafka-connection.component.scss',
})
export class RegisterKafkaConnectionComponent {
  basicConfigForm!: FormGroup;

  formOne: any[] = [
    {
      label: 'Cluster Name',
      fieldType: 'input',
      controlName: 'clusterName',
      type: 'text',
      placeholder: '',
      errorMessage: 'Cluster Name is required',
    },
    {
      label: 'Bootstrap Servers',
      fieldType: 'input',
      controlName: 'bootstrapServers',
      type: 'text',
      placeholder: '',
      errorMessage: 'Bootstrap Servers are required',
    },
  ];

  formTwo: any[] = [
    {
      label: 'Security Protocol',
      fieldType: 'select',
      controlName: 'secProtocol',
      type: 'select',
      placeholder: '',
      options: [
        { label: 'Plaint Text', value: 'PT' },
        { label: 'Ssl', value: 'SSL' },
        { label: 'Sasl Plain Text', value: 'SASL PT' },
        { label: 'Sasl Ssl', value: 'SASL SSL' },
      ],
      selected: 'PT', // Default selected value
      hint: 'Protocol used to communicate with brokers', // Added hint
    },
    {
      label: 'SASL Mechanism',
      controlName: 'saslMech',
      fieldType: 'select',
      type: 'select',
      placeholder: '',
      options: [
        { label: '', value: null },
        { label: 'GSSAPI', value: 'GSSAPI' },
        { label: 'PLAIN', value: 'PLAIN' },
        { label: 'SCRAM-SHA-256', value: 'SCRAM-SHA-256' },
        { label: 'SCRAM-SHA-512', value: 'SCRAM-SHA-512' },
      ],
      hint: 'SASL mechanism to use for authentication', // Added hint
    },
    {
      label: 'SASL User Name',
      controlName: 'saslUsername',
      type: 'text',
      placeholder: '',
      hint: 'SASL username for use with the PLAIN and SASL-SCRAM- mechanisms', // Added hint
    },
    {
      label: 'SASL Password',
      controlName: 'saslPassword',
      type: 'password',
      placeholder: '',
      hint: 'SASL password for use with the PLAIN and SASL-SCRAM- mechanism', // Added hint
    },
    {
      label: "Path to client's private key file",
      controlName: 'pathToClientPrivkf',
      type: 'text',
      placeholder: '',
      hint: "Path to client's private key (PEM) used for authentication", // Added hint
    },
    {
      label: 'SSL Key Password',
      controlName: 'sslKeyPassword',
      type: 'password',
      placeholder: '',
      hint: "Password for client's certificate", // Added hint
    },
    {
      label: "Path to client's public key file",
      controlName: 'pathToClientPubkf',
      type: 'text',
      placeholder: '',
      hint: "Path to client's public key (PEM) used for authentication", // Added hint
    },
    {
      label: 'Path to root CA certificates file',
      controlName: 'pathToRootCACertFile',
      type: 'text',
      placeholder: '',
      hint: "Path to CA certificate file for verifying the broker's certificate", // Added hint
    },
  ];

  formThree: any[] = [
    {
      label: 'Schema Registry URL',
      controlName: 'schemaRegistryUrl',
      type: 'text',
      placeholder: '',
      hint: 'Schema Registry URL', // Added hint
    },
    {
      label: 'Basic Auth User Info',
      controlName: 'basicAuthUserInfo',
      type: 'text',
      placeholder: '',
      hint: 'Schema Registry Basic Auth User Info', // Added hint
    },
    {
      label: 'Auto-register schemas',
      controlName: 'schemaRegistryUrl',
      type: 'text',
      placeholder: '',
      hint: 'Automatically register new schemas when producing messages', // Added hint
    },
  ];
  readonly panelOpenState = signal(false);

  get f() {
    return this.basicConfigForm.controls;
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.basicConfigForm = this._fb.group({
      clusterName: ['', Validators.required],
      bootstrapServers: ['', Validators.required],
      secProtocol: ['PT'],
      saslMech: [''],
      saslUsername: [''],
      saslPassword: [''],
      pathToClientPrivkf: [''],
      sslKeyPassword: [''],
      pathToClientPubkf: [''],
      pathToRootCACertFile: [''],
      schemaRegistryUrl: [''],
      basicAuthUserInfo: [''],
      autoRegisterSchemas: [''],
    });
  }

  onSubmit() {
    if (this.basicConfigForm.valid) {
      console.log(this.basicConfigForm.value);
    }
  }
}
