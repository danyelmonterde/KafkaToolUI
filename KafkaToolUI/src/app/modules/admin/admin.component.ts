import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, shareReplay } from 'rxjs';
import { FormDataService } from '../../core/services/form-data.service';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
    RouterModule,
    SidenavComponent,
    HeaderComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  label!: string;
  currentRoute: string;
  pageTitle!: string;

  formGroup!: FormGroup;
  isFormValid: boolean = false;

  links = [{ label: 'Kafka Clusters', url: '/admin/cluster' }];

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
    '/admin/cluster': [
      {
        tooltip: 'Register new Kafka cluster connection',
        routerLink: '/admin/cluster/new',
        icon: 'settings',
        label: 'Register New',
        disabled: false,
      },
    ],
    '/admin/cluster/new': [
      {
        tooltip: 'Save service configuration',
        routerLink: '/admin/cluster/new',
        icon: 'settings',
        label: 'Register Connection',
        disabled: !this.isFormValid, // Disable dynamically
      },
      {
        tooltip: 'Verify service configuration',
        routerLink: '/admin/cluster/new',
        icon: 'check',
        label: 'Verify',
        disabled: !this.isFormValid, // Disable dynamically
      },
      {
        tooltip: 'Cancel service configuration',
        routerLink: '/admin/cluster',
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
      map((result) => !!result.matches), // Ensure it always returns boolean
      shareReplay()
    );

  constructor(private formDataService: FormDataService) {
    this.currentRoute = this.router.url; // Get the current route at initialization
  }

  ngOnInit() {
    this.updatePageTitle();
    this.checkFormValue();
  }

  toggleDrawer() {
    // Make sure the drawer reference is available
    this.drawer.toggle();
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
                panelClass: 'success-alert',
              }
            );
          } else if (form.value.schemaRegistryUrl === '') {
            this._snackBar.open(
              'Http failure response for /api/clusterconfig/verify: 0 Unknown Error.',
              'Close',
              {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'error-alert',
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
                panelClass: 'success-alert',
              }
            );
          } else if (form.value.schemaRegistryUrl === '') {
            this._snackBar.open(
              'Http failure response for /api/clusterconfig/verify: 0 Unknown Error.',
              'Close',
              {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'error-alert',
              }
            );
          }
        },
      });
      // Add verification logic here
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
          const buttons = this.buttonConfig['/admin/cluster/new'];
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
