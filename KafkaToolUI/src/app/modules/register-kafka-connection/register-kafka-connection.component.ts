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
import {
  formOne,
  formTwo,
  formThree,
  formFour,
} from '../../forms/form-definitions';

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
  styleUrls: ['./register-kafka-connection.component.scss'], // Fixed typo (was "styleUrl")
})
export class RegisterKafkaConnectionComponent {
  basicConfigForm!: FormGroup;

  formOne = formOne;
  formTwo = formTwo;
  formThree = formThree;
  formFour = formFour;

  readonly panelOpenState = signal(false);

  get f() {
    return this.basicConfigForm.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.basicConfigForm = this.fb.group({
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
      autoRegisterSchemas: [false],
      cgIdPrefix: ['KMagic-'],
      apiVerRequest: [true],
      apiVerFallbackMs: ['0'],
      brokerVerFallback: ['0.10.0'],
      reconnectBackoffMaxMs: ['10000'],
      msgMaxBytes: ['1000000'],
      receiveMsgMaxBytes: ['100000000'],
      fetchErrBackoffMs: ['500'],
      fetchMaxBytes: ['52428800'],
      maxPartitionFetchBytes: ['1048576'],
      queuedMaxMsgKbytes: ['1048576'],
      queuedMinMsgs: ['100000'],
      checkCrcs: [false],
    });
  }

  onSubmit() {
    if (this.basicConfigForm.valid) {
      console.log(this.basicConfigForm.value);
    }
  }
}
