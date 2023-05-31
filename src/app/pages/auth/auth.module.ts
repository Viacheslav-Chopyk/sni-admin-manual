
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: '', loadChildren: () => import('../main/dashboard/dashboard.module').then(m => m.DashboardModule)},
    {path: '', redirectTo: '/', pathMatch: 'full'},
  ]
}];

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
