import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormGroup } from '@angular/forms';
import { FormDataService } from '../../core/services/form-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterModule, MaterialModule],
})
export class NavComponent {
  label!: string;
  currentRoute: string;
  pageTitle!: string;

  formGroup!: FormGroup;
  isFormValid: boolean = false;

  path = localStorage.getItem('path');

  links = [{ label: 'Kafka Clusters', url: '/cluster' }];

  private _snackBar = inject(MatSnackBar);

  buttonConfig: {
    [key: string]: {
      tooltip: string;
      routerLink: string;
      icon: string;
      label: string;
      disabled?: boolean;
    }[];
  } = {
    '/cluster': [
      {
        tooltip: 'Register new Kafka cluster connection',
        routerLink: '/cluster/new',
        icon: 'settings',
        label: 'Register New',
        disabled: false,
      },
    ],
    '/cluster/new': [
      {
        tooltip: 'Save service configuration',
        routerLink: '/cluster/new',
        icon: 'settings',
        label: 'Register Connection',
        disabled: !this.isFormValid, // Disable dynamically
      },
      {
        tooltip: 'Verify service configuration',
        routerLink: '/cluster/new',
        icon: 'check',
        label: 'Verify',
        disabled: !this.isFormValid, // Disable dynamically
      },
      {
        tooltip: 'Cancel service configuration',
        routerLink: '/cluster',
        icon: 'cancel',
        label: 'Cancel',
        disabled: false,
      },
    ],
  };
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router); // Inject the Router service

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private formDataService: FormDataService) {
    this.currentRoute = this.router.url; // Get the current route at initialization
  }

  ngOnInit() {
    this.updatePageTitle();
    this.checkFormValue();
  }

  onButtonClick(label: string) {
    switch (label) {
      case 'Verify':
        this.verifyConnection();
        break;
      case 'Register Connection':
        this.registerConnection();
        break;
      default:
        console.log('Button action not defined for:', label);
    }
  }

  verifyConnection() {
    // this.triggerValidation();

    if (this.isFormValid) {
      this.formDataService.getFormGroup$('basicConfigForm').subscribe({
        next: (form: any) => {
          console.log(form.value);

          if (
            form.value.schemaRegistryUrl !== '' &&
            form.value.basicAuthUserInfo !== ''
          ) {
            this._snackBar.open(
              'Successfully connected to the cluster. Validated connection to Schema Registry.',
              'Close',
              {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'mt-3',
              }
            );
          }
        },
      });
      // Add verification logic here
    } else {
      this._snackBar.open(
        'Error! Invalid data in Basic configuration.',
        'Close',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'error-alert',
        }
      );
    }
  }

  registerConnection() {
    // this.triggerValidation();
    if (this.isFormValid) {
      console.log('Registering connection...');
      // Add registration logic here
    } else {
      console.warn('Cannot register. Form is invalid.');
    }
  }

  checkFormValue() {
    this.formDataService.getFormGroup$('basicConfigForm').subscribe((form) => {
      if (form) {
        this.formGroup = form;
        this.isFormValid = form.valid;

        // Listen for form changes
        this.formGroup.statusChanges.subscribe((status) => {
          this.isFormValid = status === 'VALID';

          // Dynamically update the buttonConfig
          const buttons = this.buttonConfig['/cluster/new'];
          const { clusterName, bootstrapServers } = this.formGroup.value;

          buttons.forEach((button) => {
            if (button.label === 'Verify') {
              // Enable "Verify" button if bootstrapServers has a value
              button.disabled = !bootstrapServers;
            } else if (button.label === 'Register Connection') {
              // Enable "Register Connection" if both clusterName and bootstrapServers have values
              button.disabled = !(clusterName && bootstrapServers);
            }
          });
        });
      }
    });
  }

  // triggerValidation() {
  //   if (this.formGroup) {
  //     this.formGroup.markAllAsTouched(); // Highlight invalid fields
  //     this.isFormValid = this.formGroup.valid;
  //   }
  // }

  updatePageTitle() {
    // Optionally, subscribe to route changes
    this.router.events.subscribe((event) => {
      // Handle route change logic here
      this.currentRoute = this.router.url;

      if (this.currentRoute === '/cluster') {
        this.pageTitle = 'Registered connections to Kafka clusters';
      } else if (this.currentRoute === '/cluster/new') {
        this.pageTitle = 'Register new Kafka cluster connection';
      }
    });
  }
}
