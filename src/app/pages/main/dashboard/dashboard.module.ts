
import { SharedModule } from './../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class DashboardModule { }
