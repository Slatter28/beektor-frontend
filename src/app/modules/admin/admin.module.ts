import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, AdminRoutingModule, ChartModule, SkeletonModule],
})
export class AdminModule {}
