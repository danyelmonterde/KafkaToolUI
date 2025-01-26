import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { FormGroup } from '@angular/forms';
import { FormDataService } from '../../core/services/form-data.service';
import { log } from 'console';

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

  links = [{ label: 'Kafka Clusters', url: '/dashboard' }];

  buttonConfig: {
    [key: string]: {
      tooltip: string;
      routerLink: string;
      icon: string;
      label: string;
      disabled?: boolean;
    }[];
  } = {
    '/dashboard': [
      {
        tooltip: 'Register new Kafka cluster connection',
        routerLink: '/dashboard/new',
        icon: 'settings',
        label: 'Register New',
        disabled: false,
      },
    ],
    '/dashboard/new': [
      {
        tooltip: 'Save service configuration',
        routerLink: '/dashboard/new',
        icon: 'settings',
        label: 'Register Connection',
        disabled: !this.isFormValid, // Disable dynamically
      },
      {
        tooltip: 'Verify service configuration',
        routerLink: '/dashboard/new',
        icon: 'check',
        label: 'Verify',
        disabled: !this.isFormValid, // Disable dynamically
      },
      {
        tooltip: 'Cancel service configuration',
        routerLink: '/dashboard',
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
      console.log('Verifying connection...');

      // Add verification logic here
    } else {
      console.warn('Cannot verify. Form is invalid.');

      alert('Error! Invalid data in Basic configuration.');
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
          const buttons = this.buttonConfig['/dashboard/new'];
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

      if (this.currentRoute === '/dashboard') {
        this.pageTitle = 'Registered connections to Kafka clusters';
      } else if (this.currentRoute === '/dashboard/new') {
        this.pageTitle = 'Register new Kafka cluster connection';
      }
    });
  }
}
