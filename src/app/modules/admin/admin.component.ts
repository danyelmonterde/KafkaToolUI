import { Component, inject, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, filter, map, shareReplay } from 'rxjs';
import { FormDataService } from '../../core/services/form-data.service';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from '../../core/services/api.service';
import { CREATE_BTN_CONFIG } from '../../constants/admin-toolbar-header-config';

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

  buttonConfig = CREATE_BTN_CONFIG;

  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private apiSrvc = inject(ApiService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => !!result.matches),
      shareReplay()
    );

  constructor(
    private formDataService: FormDataService,
    private route: ActivatedRoute
  ) {
    this.currentRoute = this.router.url;
  }

  ngOnInit() {
    this.updatePageTitle();
    this.checkFormValue();

    // ✅ Update `currentRoute` and `pageTitle` when navigation ends
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    } else {
      console.error('MatSidenav drawer is not available.');
    }
  }

  onButtonClick(label: string) {
    if (this.currentRoute === '/admin/cluster/new') {
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
    } else if (this.currentRoute === '/admin/cluster/view') {
      switch (label) {
        case 'Edit configuration':
          break;

        case 'Register Connection':
          break;

        default:
          console.log('Button action not defined for:', label);
      }
    }
  }

  verifyConnection() {
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
      this.formDataService
        .getFormGroup$('basicConfigForm')
        .subscribe((form) => {
          if (form) {
            const formData = {
              brokerName: form.value.clusterName,
              brokerAddress: form.value.bootstrapServers,
              schemaRegistryProperties: {
                schemaRegistryUrlList: [
                  'http://' + form.value.schemaRegistryUrl,
                ],
              },
            };

            this.apiSrvc.saveItem('register', formData).subscribe({
              next: (response: any) => {
                console.log(response);
                this.router.navigate(['/admin/cluster/view'], {
                  state: { responseData: response },
                });
              },
              error: (err) => {
                console.error('Error during registration:', err);
                this._snackBar.open('Registration failed.', 'Close', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  panelClass: 'error-alert',
                });
              },
            });
          }
        });
    }
  }

  checkFormValue() {
    this.formDataService.getFormGroup$('basicConfigForm').subscribe((form) => {
      if (form) {
        this.formGroup = form;
        this.isFormValid = form.valid;

        this.formGroup.statusChanges.subscribe((status) => {
          this.isFormValid = status === 'VALID';

          const buttons = this.buttonConfig['/admin/cluster/new'];
          const { clusterName, bootstrapServers } = this.formGroup.value;

          buttons.forEach((button) => {
            if (button.label === 'Verify') {
              button.disabled = !bootstrapServers;
            } else if (button.label === 'Register Connection') {
              button.disabled = !(clusterName && bootstrapServers);
            }
          });
        });
      }
    });
  }

  updatePageTitle() {
    this.currentRoute = this.router.url; // ✅ Update dynamically
    console.log(this.currentRoute);

    if (this.currentRoute === '/admin/cluster') {
      this.pageTitle = 'Registered connections to Kafka clusters';
    } else if (this.currentRoute === '/admin/cluster/new') {
      this.pageTitle = 'Register new Kafka cluster connection';
    } else if (this.currentRoute === '/admin/cluster/view') {
      this.pageTitle = 'Kafka Cluster Connection';
    }
  }
}
