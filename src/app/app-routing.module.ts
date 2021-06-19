import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuardGuard } from './services/guard/admin-guard.guard';
import { UserGuardGuard } from './services/guard/user-guard.guard';
import { LoginGuard } from './services/guard/login.guard';
import { SignupGuard } from './services/guard/signup.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
   
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',


  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate:[UserGuardGuard]

  },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate:[AdminGuardGuard]
  },
  {
    path:'**',
    component :HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
