import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';

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
        disabled: true, // Example of a disabled button
      },
      {
        tooltip: 'Verify service configuration',
        routerLink: '/dashboard/new',
        icon: 'check',
        label: 'Verify',
        disabled: true,
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

  constructor() {
    this.currentRoute = this.router.url; // Get the current route at initialization
  }

  ngOnInit() {
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
