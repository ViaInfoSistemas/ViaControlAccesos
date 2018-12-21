import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SociosComponent } from './socios/socios.component';
import { AccesoComponent } from './acceso/acceso.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'socios', component: SociosComponent, canActivate: [AuthGuard] },
  { path: 'acceso', component: AccesoComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent } ,
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
