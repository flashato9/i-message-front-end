import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ConfirmResetPasswordComponent } from './authentication/sign-in/confirm-reset-password/confirm-reset-password.component';
import { ResetPasswordComponent } from './authentication/sign-in/reset-password/reset-password.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { ConfirmSignUpComponent } from './authentication/sign-up/confirm-sign-up/confirm-sign-up.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { HomePageComponent } from './post-authentication/home-page/home-page.component';

const signInRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-in/reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'sign-in/reset-password/confirm-reset-password',
    component: ConfirmResetPasswordComponent,
  },
];
const signUpRoutes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'sign-up/confirm-sign-up',
    component: ConfirmSignUpComponent,
  },
];
const homePageRoutes: Routes = [];
const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [{ path: '', redirectTo: 'sign-in', pathMatch: 'full' }, ...signInRoutes, ...signUpRoutes],
  },
  { path: 'home-page', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
