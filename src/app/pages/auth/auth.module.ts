
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [{
  path: '', component: AuthComponent, children: [
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {path: 'reset', loadChildren: () => import('./resetpass/resetpass.module').then(m => m.ResetpassModule)},
    {path: 'registration', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
    {path: 'newbusiness', loadChildren: () => import('./new-business/new-business.module').then(m => m.NewBusinessModule)},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
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
