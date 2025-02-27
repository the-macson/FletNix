import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },{
    path: ':id',
    component: ShowDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];
