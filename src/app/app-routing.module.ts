import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: 'login', loadChildren: () => import ('./pages/auth/auth.module').then(m=>m.AuthModule),
  // },
  { path: 'sni-admin-manual', loadChildren: () => import('./pages/main/main.module').then( m => m.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
