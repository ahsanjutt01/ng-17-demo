import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'users', component: UsersComponent, canActivate: [authGuard] },
    ],
  },
];
