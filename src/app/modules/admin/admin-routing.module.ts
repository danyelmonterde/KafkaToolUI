import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewComponent } from '../dashboard/view/view.component';
import { RegisterKafkaConnectionComponent } from '../register-kafka-connection/register-kafka-connection.component';

const routes: Routes = [
  { path: '', redirectTo: 'cluster', pathMatch: 'full' },
  { path: 'cluster', component: DashboardComponent },
  { path: 'cluster/new', component: RegisterKafkaConnectionComponent },
  { path: 'cluster/view', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
