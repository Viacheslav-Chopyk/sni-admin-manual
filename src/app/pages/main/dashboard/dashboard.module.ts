import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from './../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
const routes: Routes = [
  {
    path: '', component: DashboardComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgChartsModule,
    InfiniteScrollModule
  ]
})
export class DashboardModule { }
