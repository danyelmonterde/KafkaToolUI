import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterKafkaConnectionComponent } from './modules/register-kafka-connection/register-kafka-connection.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/new', component: RegisterKafkaConnectionComponent },
];
